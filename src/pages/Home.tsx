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
  },
  {
    id: 4,
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
    id: 5,
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
  const [filters, setFilters] = useState<Filters>({
    amenities: new Set(),
    occupancy: new Set()
  });

  const handleSearch = () => {
    setSearchTerm(`${locationInput} ${pgInput}`.trim());
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
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Find Your Perfect PG Accommodation
          </h1>
          <p className="text-lg text-white/90 mb-12 max-w-2xl mx-auto">
            Discover comfortable and affordable PG accommodations in your preferred location. Browse
            through verified listings with detailed amenities and real photos.
          </p>

          {/* Search Box */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-2 rounded-2xl shadow-lg flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter location..."
                  className="w-full px-4 py-3 pl-12 rounded-xl bg-gray-50 border-0
                    focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                    transition-all duration-200"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                />
              </div>
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search PGs..."
                  className="w-full px-4 py-3 pl-12 rounded-xl bg-gray-50 border-0
                    focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                    transition-all duration-200"
                  value={pgInput}
                  onChange={(e) => setPgInput(e.target.value)}
                />
              </div>
              <button
                onClick={handleSearch}
                className="md:w-auto w-full px-8 py-3 bg-indigo-600 text-white font-medium
                  rounded-xl hover:bg-indigo-700 transition-colors duration-200
                  flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <SearchFilters onFilterChange={handleFilterChange} />
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPGs.map((pg) => (
                <PGCard key={pg.id} pg={pg} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}