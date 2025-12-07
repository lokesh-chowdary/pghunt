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
  X,
} from 'lucide-react';

export interface FilterState {
  type: string;
  price: number;
  amenities: string[]; // matches DB: ['WiFi', 'Food', 'AC', ...]
}

interface SearchFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onClose?: () => void;
}

// ✅ Named export – used in Home.tsx
export const initialFilters: FilterState = {
  type: '',
  price: 0,
  amenities: [], // no amenities selected
};

// these `key` values MUST match amenity_types.name in DB
const amenitiesList = [
  { key: 'WiFi', label: 'WiFi', icon: Wifi },
  { key: 'Food', label: 'Food', icon: Tv }, // change icon if you want
  { key: 'AC', label: 'AC', icon: Snowflake },
  { key: 'Laundry', label: 'Laundry', icon: WashingMachine },
  { key: 'Power Backup', label: 'Power Backup', icon: BatteryCharging },
  { key: 'Parking', label: 'Parking', icon: Car },
  { key: '24/7 Security', label: '24/7 Security', icon: MoveVertical },
  { key: 'Gym', label: 'Gym', icon: Dumbbell },
  { key: 'Hot Water', label: 'Hot Water', icon: ShowerHead },
  { key: 'Room Cleaning', label: 'Room Cleaning', icon: WashingMachine },
  { key: 'TV', label: 'TV', icon: Tv },
  { key: 'Refrigerator', label: 'Refrigerator', icon: Tv },
];

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  setFilters,
  onClose,
}) => {
  const handleClear = () => setFilters(initialFilters);

  const toggleAmenity = (name: string) => {
    setFilters(prev => {
      const alreadySelected = prev.amenities.includes(name);
      return {
        ...prev,
        amenities: alreadySelected
          ? prev.amenities.filter(a => a !== name) // remove
          : [...prev.amenities, name],             // add
      };
    });
  };

  return (
    <aside
      className="
        w-full sm:w-80 p-5 sm:p-6
        border border-gray-200 rounded-2xl
        bg-white shadow-sm sm:shadow-md
        mb-4 sm:mb-0 sm:mr-6
        sticky top-4 z-10
        max-h-[85vh] overflow-y-auto
      "
      aria-label="Search filters"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Search Filters</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Refine results to match your perfect PG.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="sm:hidden inline-flex items-center justify-center w-7 h-7 rounded-full border border-gray-200 bg-white hover:bg-gray-50"
              aria-label="Close filters"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* PG Type */}
      <div className="mb-5">
        <label
          htmlFor="typeFilter"
          className="block text-xs font-medium text-gray-600 mb-1.5"
        >
          PG Type
        </label>
        <select
          id="typeFilter"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          value={filters.type}
          onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
        >
          <option value="">All Types</option>
          <option value="gents">Gents</option>
          <option value="ladies">Ladies</option>
          <option value="co-living">Co-living</option>
        </select>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="priceFilter"
            className="block text-xs font-medium text-gray-600"
          >
            Budget (per month)
          </label>
          <span className="text-xs text-gray-500">
            Selected:{' '}
            <span className="font-semibold text-gray-800">
              ₹{filters.price}
            </span>
          </span>
        </div>

        <input
          type="range"
          id="priceFilter"
          min={0}
          max={20000}
          step={500}
          className="w-full accent-blue-600"
          value={filters.price}
          onChange={e =>
            setFilters(f => ({ ...f, price: Number(e.target.value) }))
          }
        />

        <div className="flex justify-between text-[11px] text-gray-400 mt-1">
          <span>₹0</span>
          <span>₹20,000+</span>
        </div>
      </div>

      {/* Amenities Filter */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-medium text-gray-600">
            Amenities
          </label>
          <span className="text-[11px] text-gray-400">
            Tap to select multiple
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {amenitiesList.map(({ key, label, icon: Icon }) => {
            const isSelected = filters.amenities.includes(key);

            return (
              <button
                key={key}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggleAmenity(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 whitespace-nowrap border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
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
