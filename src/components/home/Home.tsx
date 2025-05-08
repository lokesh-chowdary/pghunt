import React, { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, Building2 } from 'lucide-react';
import SearchFilters from './SearchFilters';
import PGCard from './PGCard';
import type { PG } from '../../types';

interface Filters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  type?: string;
  amenities?: Set<string>;
  occupancy?: Set<string>;
}

export default function Home() {
  const [pgs, setPgs] = useState<PG[]>([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [pgInput, setPgInput] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    amenities: new Set(),
    occupancy: new Set(),
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch PG data from the backend dynamically
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/pgs');
        if (!response.ok) throw new Error('Failed to fetch PG data');
        const data = await response.json();

        // Ensure amenities and other fields are properly structured
        const structuredData = data.map((pg: PG) => ({
          ...pg,
          amenities: Array.isArray(pg.amenities) ? pg.amenities : [],
          occupancy: Array.isArray(pg.occupancy) ? pg.occupancy : [],
        }));
        setPgs(structuredData);
      } catch (error: any) {
        setError(error.message || 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    setSearchTerm(`${locationInput} ${pgInput}`.trim());
    setShowFilters(false);
  };

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters((prev) => {
      const updated = { ...prev };

      if ('amenity' in newFilters) {
        const amenity = newFilters.amenity as string;
        const newAmenities = new Set(prev.amenities);
        if (newFilters.checked) {
          newAmenities.add(amenity);
        } else {
          newAmenities.delete(amenity);
        }
        updated.amenities = newAmenities;
      }

      if ('occupancy' in newFilters) {
        const occupancy = newFilters.occupancy as string;
        const newOccupancy = new Set(prev.occupancy);
        if (newFilters.checked) {
          newOccupancy.add(occupancy);
        } else {
          newOccupancy.delete(occupancy);
        }
        updated.occupancy = newOccupancy;
      }

      if ('location' in newFilters) updated.location = newFilters.location as string;
      if ('minPrice' in newFilters) updated.minPrice = Number(newFilters.minPrice) || undefined;
      if ('maxPrice' in newFilters) updated.maxPrice = Number(newFilters.maxPrice) || undefined;
      if ('type' in newFilters) updated.type = newFilters.type as string;

      return updated;
    });
  };

  const filteredPGs = useMemo(() => {
    return pgs.filter((pg) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        pg.name.toLowerCase().includes(searchLower) ||
        pg.address.toLowerCase().includes(searchLower) ||
        pg.city.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;

      if (filters.location && !pg.address.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      if (filters.minPrice && pg.price < filters.minPrice) return false;
      if (filters.maxPrice && pg.price > filters.maxPrice) return false;

      if (filters.type && pg.type !== filters.type) return false;

      if (filters.amenities?.size > 0) {
        const hasAllAmenities = Array.from(filters.amenities).every((amenity) =>
          pg.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      if (filters.occupancy?.size > 0) {
        const hasMatchingOccupancy = Array.from(filters.occupancy).some((occ) =>
          pg.occupancy.includes(occ)
        );
        if (!hasMatchingOccupancy) return false;
      }

      return true;
    });
  }, [searchTerm, filters, pgs]);

  return (
    <div className="min-h-[calc(100vh-73px)]">
     

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Search Filters Section */}
            <div
              className={`col-span-1 fixed inset-0 z-40 lg:relative lg:z-0 transform 
              ${showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
              transition-transform duration-300 ease-in-out`}
            >
              <div className="h-full lg:h-[calc(100vh-185px)] lg:sticky lg:top-[89px]">
                <div className="h-full bg-white lg:bg-transparent shadow-xl lg:shadow-none overflow-y-auto">
                  <SearchFilters
                    onFilterChange={handleFilterChange}
                    onClose={() => setShowFilters(false)}
                    isMobile={true}
                  />
                </div>
              </div>
            </div>

            {/* PG Cards Section */}
            <div className="col-span-1 lg:col-span-3">
              {loading ? (
                <div className="text-center">Loading...</div>
              ) : error ? (
                <div className="text-center text-red-500">{error}</div>
              ) : filteredPGs.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                  <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No PGs Found</h3>
                  <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPGs.map((pg) => (
                    <PGCard key={pg.id} pg={pg} />
                  ))}
                </div>
              )}
            </div>
          </div>
      </div>
    </div>
  );
}