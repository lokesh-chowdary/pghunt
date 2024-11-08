import React from 'react';
import { Sliders, MapPin, IndianRupee, Users, Wifi, Home } from 'lucide-react';

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void;
}

export default function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-fade-in">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        </div>
      </div>
      
      <div className="p-4 space-y-6">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <MapPin className="w-4 h-4 text-gray-400" />
            Location
          </label>
          <div className="relative">
            <input
              type="text"
              className="input-field pl-10"
              placeholder="Enter location"
              onChange={(e) => onFilterChange({ location: e.target.value })}
            />
            <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <IndianRupee className="w-4 h-4 text-gray-400" />
            Price Range
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <input
                type="number"
                placeholder="Min"
                className="input-field pl-10"
                onChange={(e) => onFilterChange({ minPrice: e.target.value })}
              />
              <span className="absolute left-3 top-2.5 text-gray-400">₹</span>
            </div>
            <div className="relative flex-1">
              <input
                type="number"
                placeholder="Max"
                className="input-field pl-10"
                onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
              />
              <span className="absolute left-3 top-2.5 text-gray-400">₹</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Users className="w-4 h-4 text-gray-400" />
            PG Type
          </label>
          <select 
            className="input-field"
            onChange={(e) => onFilterChange({ type: e.target.value })}
          >
            <option value="">All Types</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Home className="w-4 h-4 text-gray-400" />
            Occupancy
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['Single', 'Double', 'Triple', 'Four Sharing'].map((type) => (
              <label key={type} className="relative flex items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  onChange={(e) => onFilterChange({ 
                    occupancy: type,
                    checked: e.target.checked 
                  })}
                />
                <div className="w-full p-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg
                  peer-checked:border-indigo-500 peer-checked:text-indigo-600 peer-checked:bg-indigo-50
                  hover:bg-gray-50 cursor-pointer transition-all duration-200 text-center">
                  {type}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Wifi className="w-4 h-4 text-gray-400" />
            Amenities
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['WiFi', 'AC', 'Food', 'Laundry', 'Parking', 'Security'].map((amenity) => (
              <label key={amenity} className="relative flex items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  onChange={(e) => onFilterChange({ 
                    amenity,
                    checked: e.target.checked 
                  })}
                />
                <div className="w-full p-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg
                  peer-checked:border-indigo-500 peer-checked:text-indigo-600 peer-checked:bg-indigo-50
                  hover:bg-gray-50 cursor-pointer transition-all duration-200 text-center">
                  {amenity}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}