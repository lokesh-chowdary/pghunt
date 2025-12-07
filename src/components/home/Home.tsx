import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchFilters from './SearchFilters';
import type { PG } from '../../types';
import { getFirstImageUrl, handleImageError } from '../../utils/imageUtils';
import { getApiUrl } from '../../config/api';
import { Filter, X, Heart, Share2, MapPin } from 'lucide-react';

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
  food: boolean;
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
    food: false,
  },
};

const Home = () => {
  const [pgs, setPgs] = useState<PG[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);
  const [filters, setFilters] = useState(initialFilters);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    axios
      .get(getApiUrl('/pgs'))
      .then((response) => {
        // Backend returns { success: true, data: [...] }
        if (response.data.success && Array.isArray(response.data.data)) {
          setPgs(response.data.data);
        } else {
          console.error('Invalid response format:', response.data);
          setPgs([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching PG data:', error);
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

  const filteredPGs = (Array.isArray(pgs) ? pgs : []).filter((pg) => {
    // Handle both old and new data structures
    const pgType = pg.type || pg.preferred_for;
    const matchesType = !filters.type || pgType === filters.type;
    const matchesCity =
      !filters.city ||
      pg.city?.toLowerCase().includes(filters.city.toLowerCase());

    // Get price from sharing types or fallback to price field
    let pgPrice = pg.price || 0;
    if (pg.sharing_types && !pg.price) {
      const enabledSharing = Object.values(pg.sharing_types).find(
        (sharing: any) => sharing.enabled
      );
      pgPrice = enabledSharing ? parseInt(enabledSharing.rent) || 0 : 0;
    }
    const matchesPrice = pgPrice >= filters.price;

    const selectedAmenities = Object.entries(filters.amenities)
      .filter(([, value]) => value)
      .map(([key]) => key);

    const matchesAmenities =
      selectedAmenities.length === 0 ||
      selectedAmenities.every((amenity) =>
        pg.amenities?.some(
          (pgAmenity: string) =>
            pgAmenity.toLowerCase().includes(amenity.toLowerCase())
        ) || false
      );

    return matchesType && matchesCity && matchesPrice && matchesAmenities;
  });

  if (loading)
    return <p className="text-center mt-10 text-lg">Loading PGs...</p>;

  return (
    <div className="min-h-screen bg-[#F4F5FB]">
      {/* Mobile Filter Toggle Button */}
      <div className="sm:hidden sticky top-0 z-20 bg-[#F4F5FB] border-b border-gray-200 p-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-[#6F3FF6] text-white rounded-full shadow-md hover:bg-[#5b31d4] transition-colors"
        >
          {showFilters ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
          {showFilters ? 'Close Filters' : 'Show Filters'}
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-0 py-6 flex flex-col gap-6">
        <div className="flex w-full flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-16">
          {/* Filters Section */}
          <div
            className={`${
              showFilters ? 'block' : 'hidden'
            } sm:block sm:w-3/12 sm:pr-4`}
          >
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 sticky top-20">
              <SearchFilters
                filters={filters}
                setFilters={setFilters}
                onClose={() => setShowFilters(false)}
              />
            </div>
          </div>

          {/* Cards Section */}
          <div className="w-full sm:w-9/12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPGs.slice(0, visibleCount).map((pg: PG) => {
                // Handle both old and new data structures
                const pgName = pg.pg_name || pg.name || 'PG';
                const pgType = pg.type || pg.preferred_for;

                // Get the lowest price from sharing types or fallback to price field
                let displayPrice = pg.price || 0;
                if (pg.sharing_types && !pg.price) {
                  const enabledPrices = Object.values(pg.sharing_types)
                    .filter((sharing: any) => sharing.enabled)
                    .map((sharing: any) => parseInt(sharing.rent) || 0)
                    .filter((price) => price > 0);
                  displayPrice =
                    enabledPrices.length > 0 ? Math.min(...enabledPrices) : 0;
                }

                return (
                  <div
                    key={pg.id}
                    className="group flex flex-col rounded-2xl bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
                    onClick={() => (window.location.href = `/pg/${pg.id}`)}
                  >
                    {/* Image section with overlays */}
                    <div className="relative w-full h-36">
                      <img
                        src={getFirstImageUrl(pg.images)}
                        alt={pgName}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                        loading="lazy"
                      />
                      {/* Rating badge */}
                      {pg.rating && (
                        <div className="absolute top-3 left-3 bg-white/90 rounded-full px-2.5 py-1 flex items-center gap-1 text-xs font-semibold shadow-md">
                          <span className="text-yellow-500">★</span>
                          <span>{pg.rating}</span>
                        </div>
                      )}
                      {/* Heart & share icons */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Heart className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Share2 className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* Content section */}
                    <div className="flex flex-col justify-between flex-1 px-4 pt-4">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-4">
                          <h2 className="text-base font-semibold truncate max-w-[70%]">
                            {pgName}
                          </h2>
                          {/* Price on the right like reference */}
                          <div className="text-right whitespace-nowrap">
                            {displayPrice > 0 ? (
                              <>
                                 
                                <p className="text-sm font-bold text-[#0BA668] leading-tight">
                                  ₹{displayPrice.toLocaleString('en-IN')}
                                </p>
                               
                              </>
                            ) : (
                              <p className="text-xs text-gray-500">
                                Price on request
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
                          <MapPin className="w-3 h-3" />
                          <p className="truncate">
                            {pg.address || 'Address not available'},{' '}
                            {pg.city || 'City not available'}
                          </p>
                        </div>

                        {/* Type + static chips (Professionals / Verified) */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          {pgType && (
                            <span className="px-2 py-1 rounded-full bg-[#E7F1FF] text-[11px] font-medium text-[#1D4ED8] capitalize">
                              {pgType}
                            </span>
                          )}
                          <span className="px-2 py-1 rounded-full bg-[#FFF4E5] text-[11px] font-medium text-[#92400E]">
                            Professionals
                          </span>
                          <span className="px-2 py-1 rounded-full bg-[#E6F7EC] text-[11px] font-medium text-[#047857] border border-[#34D399]/60">
                            Verified
                          </span>
                        </div>

                    
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Show More Button */}
            {visibleCount < filteredPGs.length && (
              <div className="w-full flex justify-center mt-8">
                <button
                  onClick={handleShowMore}
                  className="px-6 py-2 bg-[#6F3FF6] text-white rounded-full shadow-md hover:bg-[#5b31d4] transition"
                >
                  Click More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
