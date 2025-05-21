import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchFilters from './SearchFilters';

type PG = {
  id: number;
  name: string;
  address: string;
  city: string;
  price: number;
  rating: number;
  type: string;
  images: string | string[];
  amenities?: string[];
};

const initialFilters = {
  type: "",
  price: 0,
  city: "",
  amenities: {
    wifi: false,
    ac: false,
    laundry: false,
    parking: false,
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
      pg.amenities?.includes(amenity)
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
          {filteredPGs.slice(0, visibleCount).map((pg) => {
            let image = '';
            try {
              const images = typeof pg.images === 'string' ? JSON.parse(pg.images) : pg.images;
              image = images?.[0] || 'https://via.placeholder.com/150';
            } catch (e) {
              image = 'https://via.placeholder.com/150';
            }

            return (
              <div
                key={pg.id}
                className="p-4 border rounded shadow cursor-pointer"
                onClick={() => window.location.href = `/pg/${pg.id}`}
              >
                <img
                  src={image}
                  alt={pg.name}
                  className="w-full h-32 object-cover mb-2 rounded"
                />
                <h2 className="text-xl font-semibold mb-2">{pg.name}</h2>
                <p className="text-gray-600 mb-1">{pg.address}, {pg.city}</p>
                <p className="text-gray-600 mb-1">₹{pg.price}</p>
                <p className="text-gray-600 mb-1">Rating: {pg.rating}</p>
                <p className="text-gray-600 mb-1">Type: {pg.type}</p>
                <div className="mt-2 text-sm text-gray-600">
                  {pg.amenities?.length ? (
                    <ul className="list-disc list-inside">
                      {pg.amenities.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No amenities listed</p>
                  )}
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