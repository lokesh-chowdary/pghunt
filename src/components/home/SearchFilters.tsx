import React, { useState } from 'react';
import { Sliders, MapPin, IndianRupee, Users, Wifi, Home, X } from 'lucide-react';

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

export default function SearchFilters({ onFilterChange, onClose, isMobile }: SearchFiltersProps) {
  const [tempFilters, setTempFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    type: '',
    occupancy: new Set<string>(),
    amenities: new Set<string>(),
  });

  const handleTempFilterChange = (newFilter: any) => {
    setTempFilters((prev) => {
      const updated = { ...prev };

      if ('location' in newFilter) {
        updated.location = newFilter.location;
      }
      if ('minPrice' in newFilter) {
        updated.minPrice = newFilter.minPrice;
      }
      if ('maxPrice' in newFilter) {
        updated.maxPrice = newFilter.maxPrice;
      }
      if ('type' in newFilter) {
        updated.type = newFilter.type;
      }
      if ('occupancy' in newFilter) {
        const occupancy = newFilter.occupancy as string;
        const newOccupancy = new Set(prev.occupancy);
        if (newFilter.checked) {
          newOccupancy.add(occupancy);
        } else {
          newOccupancy.delete(occupancy);
        }
        updated.occupancy = newOccupancy;
      }
      if ('amenity' in newFilter) {
        const amenity = newFilter.amenity as string;
        const newAmenities = new Set(prev.amenities);
        if (newFilter.checked) {
          newAmenities.add(amenity);
        } else {
          newAmenities.delete(amenity);
        }
        updated.amenities = newAmenities;
      }

      return updated;
    });
  };

  // Apply filters and close the panel on mobile
  const handleApplyFilters = () => {
    onFilterChange({
      location: tempFilters.location,
      minPrice: tempFilters.minPrice,
      maxPrice: tempFilters.maxPrice,
      type: tempFilters.type,
      occupancy: tempFilters.occupancy,
      amenities: tempFilters.amenities,
    });
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <div>
      <style>
        {`
          .filters-container {
            background-color: #FFFFFF;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            overflow-y: auto;
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          .filters-header {
            padding: 16px;
            border-bottom: 1px solid #F3F4F6;
            position: sticky;
            top: 0;
            background-color: #FFFFFF;
            z-index: 10;
          }

          .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .header-title {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .header-title-text {
            font-size: 18px;
            font-weight: 700;
            color: #111827;
          }

          .close-button {
            padding: 8px;
            border-radius: 9999px;
            transition: background-color 0.2s ease;
            background: none;
            border: none;
            cursor: pointer;
          }

          .close-button:hover {
            background-color: #F3F4F6;
          }

          .filters-content {
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 24px;
            flex: 1;
          }

          .filter-section {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .filter-label {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            font-weight: 500;
            color: #374151;
          }

          .filter-input-group {
            position: relative;
          }

          .filter-input {
            width: 100%;
            padding: 8px 12px 8px 36px;
            border: 1px solid #D1D5DB;
            border-radius: 6px;
            font-size: 14px;
            color: #374151;
            outline: none;
            transition: border-color 0.2s ease;
          }

          .filter-input:focus {
            border-color: #4F46E5;
          }

          .filter-input::placeholder {
            color: #9CA3AF;
          }

          .input-icon {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: #9CA3AF;
          }

          .price-range {
            display: flex;
            gap: 12px;
          }

          .price-input-group {
            position: relative;
            flex: 1;
          }

          .price-symbol {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: #9CA3AF;
            font-size: 14px;
          }

          .filter-select {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #D1D5DB;
            border-radius: 6px;
            font-size: 14px;
            color: #374151;
            outline: none;
            transition: border-color 0.2s ease;
            background-color: #FFFFFF;
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 12px center;
            background-size: 16px;
          }

          .filter-select:focus {
            border-color: #4F46E5;
          }

          .checkbox-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .checkbox-label {
            position: relative;
            display: flex;
            align-items: center;
          }

          .checkbox-input {
            position: absolute;
            opacity: 0;
            width: 0;
            height: 0;
          }

          .checkbox-text {
            width: 100%;
            padding: 8px;
            text-align: center;
            font-size: 14px;
            color: #6B7280;
            background-color: #FFFFFF;
            border: 1px solid #D1D5DB;
            border-radius: 6px;
            transition: all 0.2s ease;
            cursor: pointer;
          }

          .checkbox-input:checked + .checkbox-text {
            border-color: #4F46E5;
            color: #4F46E5;
            background-color: #EEF2FF;
          }

          .checkbox-text:hover {
            background-color: #F3F4F6;
          }

          .apply-button {
            width: 100%;
            padding: 12px;
            background-color: #4F46E5;
            color: #FFFFFF;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.2s ease;
            margin-top: 16px;
          }

          .apply-button:hover {
            background-color: #4338CA;
          }

          @media (max-width: 639px) {
            .filters-content {
              padding: 12px;
              gap: 16px;
            }

            .filter-input {
              padding: 6px 12px 6px 36px;
              font-size: 13px;
            }

            .filter-select {
              padding: 6px 12px;
              font-size: 13px;
            }

            .checkbox-text {
              padding: 6px;
              font-size: 13px;
            }

            .apply-button {
              padding: 10px;
            }
          }

          @media (min-width: 640px) and (max-width: 1023px) {
            .filters-content {
              padding: 16px;
              gap: 20px;
            }

            .checkbox-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          @media (min-width: 1024px) {
            .filters-container {
              box-shadow: none;
            }

            .close-button {
              display: none;
            }

            .filters-content {
              padding: 20px;
              gap: 24px;
            }

            .checkbox-grid {
              grid-template-columns: repeat(2, 1fr);
            }

            .apply-button {
              margin-top: 24px;
              padding: 12px;
            }
          }
        `}
      </style>

      <div className="filters-container">
        <div className="filters-header">
          <div className="header-content">
            <div className="header-title">
              <Sliders style={{ width: '20px', height: '20px', color: '#4F46E5' }} />
              <h2 className="header-title-text">Filters</h2>
            </div>
            {isMobile && onClose && (
              <button onClick={onClose} className="close-button">
                <X style={{ width: '20px', height: '20px', color: '#374151' }} />
              </button>
            )}
          </div>
        </div>

        <div className="filters-content">
          <div className="filter-section">
            <label className="filter-label">
              <MapPin style={{ width: '16px', height: '16px', color: '#9CA3AF' }} />
              Location
            </label>
            <div className="filter-input-group">
              <MapPin className="input-icon" style={{ width: '20px', height: '20px' }} />
              <input
                type="text"
                className="filter-input"
                placeholder="Enter location"
                value={tempFilters.location}
                onChange={(e) => handleTempFilterChange({ location: e.target.value })}
              />
            </div>
          </div>

          <div className="filter-section">
            <label className="filter-label">
              <IndianRupee style={{ width: '16px', height: '16px', color: '#9CA3AF' }} />
              Price Range
            </label>
            <div className="price-range">
              <div className="price-input-group">
                <span className="price-symbol">₹</span>
                <input
                  type="number"
                  placeholder="Min"
                  className="filter-input"
                  value={tempFilters.minPrice}
                  onChange={(e) => handleTempFilterChange({ minPrice: e.target.value })}
                />
              </div>
              <div className="price-input-group">
                <span className="price-symbol">₹</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="filter-input"
                  value={tempFilters.maxPrice}
                  onChange={(e) => handleTempFilterChange({ maxPrice: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="filter-section">
            <label className="filter-label">
              <Users style={{ width: '16px', height: '16px', color: '#9CA3AF' }} />
              PG Type
            </label>
            <select
              className="filter-select"
              value={tempFilters.type}
              onChange={(e) => handleTempFilterChange({ type: e.target.value })}
            >
              <option value="">All Types</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>

          <div className="filter-section">
            <label className="filter-label">
              <Home style={{ width: '16px', height: '16px', color: '#9CA3AF' }} />
              Occupancy
            </label>
            <div className="checkbox-grid">
              {['Single', 'Double', 'Triple', 'Four Sharing'].map((type) => (
                <label key={type} className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={tempFilters.occupancy.has(type)}
                    onChange={(e) => handleTempFilterChange({ 
                      occupancy: type,
                      checked: e.target.checked 
                    })}
                  />
                  <div className="checkbox-text">{type}</div>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <label className="filter-label">
              <Wifi style={{ width: '16px', height: '16px', color: '#9CA3AF' }} />
              Amenities
            </label>
            <div className="checkbox-grid">
              {['WiFi', 'AC', 'Food', 'Laundry', 'Parking', 'Security'].map((amenity) => (
                <label key={amenity} className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={tempFilters.amenities.has(amenity)}
                    onChange={(e) => handleTempFilterChange({ 
                      amenity,
                      checked: e.target.checked 
                    })}
                  />
                  <div className="checkbox-text">{amenity}</div>
                </label>
              ))}
            </div>
          </div>

          <button onClick={handleApplyFilters} className="apply-button">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}