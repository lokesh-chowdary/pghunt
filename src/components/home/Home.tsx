import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchFilters from './SearchFilters';
import type { PG } from '../../types';
import { getFirstImageUrl, handleImageError } from '../../utils/imageUtils';
import { getApiUrl } from '../../config/api';
import { Filter, X } from 'lucide-react';

interface Amenities {
  wifi: boolean;
  ac: boolean;
  geyser: boolean;
  washingMachine: boolean;
  lift: boolean;
  parking: boolean;
  gym: boolean;
  fridge: boolean;
  evCharging: boolean;
}

interface FilterState {
  type: string;
  price: number;
  city: string;
  amenities: Amenities;
}

const initialFilters: FilterState = {
  type: "",
  price: 0,
  city: "",
  amenities: {
    wifi: false,
    ac: false,
    geyser: false,
    washingMachine: false,
    lift: false,
    parking: false,
    gym: false,
    fridge: false,
    evCharging: false,
  },
};

const PGList = () => {
  const [pgs, setPgs] = useState<PG[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);
  const [filters, setFilters] = useState(initialFilters);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    axios.get(getApiUrl('/pgs'))
      .then((response) => {
        // Backend returns { success: true, data: [...] }
        if (response.data.success && Array.isArray(response.data.data)) {
          setPgs(response.data.data);
        } else {
          console.error("Invalid response format:", response.data);
          setPgs([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching PG data:", error);
        setPgs([]); // Ensure pgs is always an array
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setVisibleCount(4); // Reset count when filters change
  }, [filters]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const filteredPGs = (Array.isArray(pgs) ? pgs : []).filter(pg => {
    // Handle both old and new data structures
    const pgType = pg.type || pg.preferred_for;
    const matchesType = !filters.type || pgType === filters.type;
    const matchesCity = !filters.city || pg.city.toLowerCase().includes(filters.city.toLowerCase());
    
    // Get price from sharing types or fallback to price field
    let pgPrice = pg.price || 0;
    if (pg.sharing_types && !pg.price) {
      const enabledSharing = Object.values(pg.sharing_types).find(sharing => sharing.enabled);
      pgPrice = enabledSharing ? parseInt(enabledSharing.rent) || 0 : 0;
    }
    const matchesPrice = pgPrice >= filters.price;

    const selectedAmenities = Object.entries(filters.amenities)
      .filter(([, value]) => value)
      .map(([key]) => key);

    const matchesAmenities = selectedAmenities.every(amenity =>
      pg.amenities.some(pgAmenity => 
        pgAmenity.toLowerCase().includes(amenity.toLowerCase())
      )
    );

    return matchesType && matchesCity && matchesPrice && matchesAmenities;
  });

  if (loading) return <p className="text-center mt-10 text-lg">Loading PGs...</p>;

  return (
    <div className="min-h-screen">
      {/* Mobile Filter Toggle Button */}
      <div className="sm:hidden sticky top-0 z-20 bg-white border-b border-gray-200 p-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showFilters ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
          {showFilters ? 'Close Filters' : 'Show Filters'}
        </button>
      </div>

      <div className="flex flex-col items-start justify-start mt-4 ml-4">
        <div className="flex w-full flex-col sm:flex-row">
          {/* Filters Section */}
          <div className={`${showFilters ? 'block' : 'hidden'} sm:block`}>
            <SearchFilters 
              filters={filters} 
              setFilters={setFilters} 
              onClose={() => setShowFilters(false)}
            />
          </div>

          {/* Cards Section */}
          <div className="w-full sm:w-9/12 grid grid-cols-1 sm:grid-cols-2 gap-4 pr-4">
          {filteredPGs.slice(0, visibleCount).map((pg: PG) => {
            // Handle both old and new data structures
            const pgName = pg.pg_name || pg.name || 'PG';
            const pgType = pg.type || pg.preferred_for;
            
            // Get the lowest price from sharing types or fallback to price field
            let displayPrice = pg.price || 0;
            if (pg.sharing_types && !pg.price) {
              const enabledPrices = Object.values(pg.sharing_types)
                .filter(sharing => sharing.enabled)
                .map(sharing => parseInt(sharing.rent) || 0)
                .filter(price => price > 0);
              displayPrice = enabledPrices.length > 0 ? Math.min(...enabledPrices) : 0;
            }

            return (
              <div
                key={pg.id}
                className="flex flex-col justify-between p-4 border rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 h-[330px] bg-white"
                onClick={() => window.location.href = `/pg/${pg.id}`}>
                <div>
                  <img
                    src={getFirstImageUrl(pg.images)}
                    alt={pgName}
                    className="w-full h-40 object-cover rounded-md mb-3"
                    onError={handleImageError}
                    loading="lazy"
                  />
                 <div className="flex justify-between items-center mb-1">
                   <h2 className="text-lg font-bold truncate">{pgName}</h2>
                   <p className="text-blue-700 font-semibold text-sm whitespace-nowrap ml-4">
                     {displayPrice > 0 ? `₹${displayPrice}` : 'Price on request'}
                   </p>
                </div>
                <div className="flex justify-between items-center mb-1">
                   <p className="text-gray-600 text-sm mb-1 truncate">
                     {pg.address}, {pg.city}
                   </p>
                    {pgType && (
                      <p className="text-gray-600 text-sm mb-2 capitalize">
                        {pgType}
                      </p>
                    )}
                </div>   
                {pg.rating && (
                  <p className="text-gray-600 text-sm mb-1">Rating: {pg.rating}</p>
                )}
                <div className="text-xs text-gray-500">
                      {pg.amenities.length > 0 ? (
                 <div className="flex flex-wrap gap-2">
                     {pg.amenities.slice(0, 4).map((item, index) => (
                   <span
                     key={index}
                     className="px-2 py-1 rounded bg-blue-100 text-black text-xs inline-flex items-center gap-1.5">
                       {item}
                   </span>
                    ))}
                   {pg.amenities.length > 4 && (
                      <span className="px-2 py-1 rounded bg-blue-100 text-black text-xs inline-flex items-center gap-1.5">
                         +{pg.amenities.length - 4} more
                     </span>
                     )}
                           </div>
                      ) : (
                      <p>No amenities listed</p>
              )}
               </div>

                </div>
              </div>
            );
          })}
          </div>
        </div>

        {/* Show More Button */}
        {visibleCount < filteredPGs.length && (
          <div className="w-full flex justify-center mt-6">
            <button
              onClick={handleShowMore}
              className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
            >
              Click More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PGList;
