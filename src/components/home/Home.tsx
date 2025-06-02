import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchFilters from './SearchFilters';
import type { PG } from '../../types';

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

  useEffect(() => {
    axios.get('http://localhost:8000/api/pgs')
      .then((response) => {
        setPgs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching PG data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setVisibleCount(4); // Reset count when filters change
  }, [filters]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const filteredPGs = pgs.filter(pg => {
    const matchesType = !filters.type || pg.type === filters.type;
    const matchesCity = !filters.city || pg.city.toLowerCase().includes(filters.city.toLowerCase());
    const matchesPrice = pg.price >= filters.price;

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
    <div className="flex flex-col items-start justify-start min-h-screen mt-4 ml-4">
      <div className="flex w-full flex-col sm:flex-row">

        {/* Filters Section */}
        <SearchFilters filters={filters} setFilters={setFilters} />

        {/* Cards Section */}
        <div className="w-full sm:w-9/12 grid grid-cols-1 sm:grid-cols-2 gap-4 pr-4">
          {filteredPGs.slice(0, visibleCount).map((pg: PG) => {
            const image = pg.images?.[0] || 'https://via.placeholder.com/150';

            return (
              <div
                key={pg.id}
                className="flex flex-col justify-between p-4 border rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 h-[330px] bg-white"
                onClick={() => window.location.href = `/pg/${pg.id}`}>
                <div>
                  <img
                    src={image}
                    alt={pg.name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                 <div className="flex justify-between items-center mb-1">
                   <h2 className="text-lg font-bold truncate">{pg.name}</h2>
                   <p className="text-blue-700 font-semibold text-sm whitespace-nowrap ml-4">
                   ₹{pg.price}
                   </p>
                </div>
                <div className="flex justify-between items-center mb-1">
                   <p className="text-gray-600 text-sm mb-1 truncate">
                     {pg.address}, {pg.city}
                   </p>
                    <p className="text-gray-600 text-sm mb-2">Type: {pg.type}</p>
                </div>   
                    <p className="text-gray-600 text-sm mb-1">Rating: {pg.rating}</p>
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
  );
};

export default PGList;
