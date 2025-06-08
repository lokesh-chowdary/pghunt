import React from 'react';
import {
  Wifi,
  Car,
  Dumbbell,
  Snowflake,
  Tv,
  MoveVertical,
  ShowerHead,
  WashingMachine,
  BatteryCharging,
} from 'lucide-react';

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

interface SearchFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const initialFilters: FilterState = {
  type: '',
  price: 0,
  city: '',
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

const amenitiesList = [
  { key: 'wifi', label: 'Wi-Fi', icon: Wifi },
  { key: 'ac', label: 'AC', icon: Snowflake },
  { key: 'geyser', label: 'Geyser', icon: ShowerHead },
  { key: 'washingMachine', label: 'Washing Machine', icon: WashingMachine },
  { key: 'lift', label: 'Lift', icon: MoveVertical },
  { key: 'parking', label: 'Parking', icon: Car },
  { key: 'gym', label: 'Gym', icon: Dumbbell },
  { key: 'fridge', label: 'Fridge', icon: Tv },
  { key: 'evCharging', label: 'EV Charging', icon: BatteryCharging },
  {key: 'food', label: 'Food', icon: Tv },
];

const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, setFilters }) => {
  const handleClear = () => setFilters(initialFilters);

  const toggleAmenity = (key: keyof Amenities) => {
    setFilters(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [key]: !prev.amenities[key],
      },
    }));
  };

  return (
    <aside
      className="w-full sm:w-80 p-5 border rounded-2xl shadow-md bg-white mb-4 sm:mb-0 sm:mr-6 sticky top-4 z-10 overflow-y-auto max-h-[85vh]"
      aria-label="Search filters"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-5">Search Filters</h2>

      {/* PG Type Filter */}
      <div className="mb-6">
        <label htmlFor="typeFilter" className="block text-sm font-medium text-gray-700 mb-2">
          PG Type
        </label>
        <select
          id="typeFilter"
          className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={filters.type}
          onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
        >
          <option value="">All Types</option>
          <option value="boys">Boys</option>
          <option value="girls">Girls</option>
          <option value="co-ed">Co-ed</option>
        </select>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <label htmlFor="priceFilter" className="block text-sm font-medium text-gray-700 mb-2">
          Price Range
        </label>
        <input
          type="range"
          id="priceFilter"
          min="0"
          max="10000"
          className="w-full accent-blue-600"
          value={filters.price}
          onChange={e => setFilters(f => ({ ...f, price: Number(e.target.value) }))}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>₹0</span>
          <span>₹10,000+</span>
        </div>
        <div className="text-right text-sm text-gray-700 mt-1">
          Selected: <span className="font-semibold">₹{filters.price}</span>
        </div>
      </div>

      {/* Amenities Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
        <div className="flex flex-wrap gap-2">
          {amenitiesList.map(({ key, label, icon: Icon }) => {
            const isSelected = filters.amenities[key as keyof Amenities];
            return (
              <button
                key={key}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggleAmenity(key as keyof Amenities)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-all duration-150 shadow-sm whitespace-nowrap ${
                  isSelected
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-150"
          onClick={() => console.log(filters)}
        >
          Apply Filters
        </button>
        <button
          type="button"
          className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition duration-150"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </aside>
  );
};

export default SearchFilters;
