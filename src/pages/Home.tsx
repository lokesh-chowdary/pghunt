import React, { useState, useMemo } from 'react';
import { Search, MapPin, Building2 } from 'lucide-react';
import SearchFilters from '../components/SearchFilters';
import PGCard from '../components/PGCard';
import type { PG } from '../types';

// Mock data remains unchanged
const mockPGs: PG[] = [
  {
    id: 1,
    name: "Comfort Stay PG",
    address: "123 MG Road, Bangalore",
    city: "Bangalore",
    price: 12000,
    rating: 4.5,
    type: "male",
    amenities: ["WiFi", "AC", "Food", "Laundry", "Parking", "Security"],
    images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80"],
    roomTypes: ["Single", "Double", "Triple"],
    occupancy: ["Single", "Double"]
  },
  {
    id: 2,
    name: "Green View PG",
    address: "456 Koramangala, Bangalore",
    city: "Bangalore",
    price: 15000,
    rating: 4.8,
    type: "unisex",
    amenities: ["WiFi", "AC", "Food", "Gym", "Power Backup"],
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80"],
    roomTypes: ["Single", "Double"],
    occupancy: ["Single"]
  },
  {
    id: 3,
    name: "Student Hub PG",
    address: "789 HSR Layout, Bangalore",
    city: "Bangalore",
    price: 10000,
    rating: 4.2,
    type: "female",
    amenities: ["WiFi", "Food", "Security", "Library"],
    images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80"],
    roomTypes: ["Double", "Triple"],
    occupancy: ["Double", "Triple"]
  }
];

interface Filters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  type?: string;
  amenities?: Set<string>;
  occupancy?: Set<string>;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [pgInput, setPgInput] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    amenities: new Set(),
    occupancy: new Set()
  });

  const handleSearch = () => {
    setSearchTerm(`${locationInput} ${pgInput}`.trim());
    setShowFilters(false);
  };

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => {
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
    return mockPGs.filter(pg => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || 
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
        const hasAllAmenities = Array.from(filters.amenities).every(amenity =>
          pg.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      if (filters.occupancy?.size > 0) {
        const hasMatchingOccupancy = Array.from(filters.occupancy).some(occ =>
          pg.occupancy.includes(occ)
        );
        if (!hasMatchingOccupancy) return false;
      }

      return true;
    });
  }, [searchTerm, filters]);

  return (
    <div className="min-h-[calc(100vh-73px)]">
     

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg
                flex items-center justify-center gap-2 shadow-sm hover:bg-gray-50
                transition-colors duration-200"
            >
              <Search className="w-5 h-5" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Filters Sidebar - Mobile Drawer */}
          <div className={`lg:col-span-1 fixed inset-0 z-40 lg:relative lg:z-0 transform 
            ${showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            transition-transform duration-300 ease-in-out lg:block`}>
            <div className="h-full lg:h-[calc(100vh-185px)] lg:sticky lg:top-[89px]">
              <div className="h-full bg-white lg:bg-transparent shadow-xl lg:shadow-none">
                <SearchFilters 
                  onFilterChange={handleFilterChange} 
                  onClose={() => setShowFilters(false)}
                  isMobile={true}
                />
              </div>
            </div>
          </div>

          {/* Backdrop for mobile filters */}
          {showFilters && (
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
          )}

          {/* PG Listings */}
          <div className="lg:col-span-3 h-full lg:h-[calc(100vh-185px)] overflow-y-auto pr-2 
            scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {filteredPGs.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="max-w-md mx-auto">
                  <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No PGs Found
                  </h3>
                  <p className="text-gray-500">
                    We couldn't find any PGs matching your criteria. Try adjusting your filters
                    or search terms.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPGs.map((pg, index) => (
                  <div key={pg.id} 
                    className="opacity-0 animate-fade-up"
                    style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}>
                    <PGCard pg={pg} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}