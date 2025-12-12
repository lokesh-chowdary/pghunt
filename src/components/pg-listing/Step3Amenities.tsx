import React, { useState } from 'react';
import { PGFormData } from'./AddPgForm';

interface Step3Props {
  formData: PGFormData;
  updateFormData: (data: Partial<PGFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const Step3Amenities: React.FC<Step3Props> = ({ formData, updateFormData, onNext, onPrev }) => {
  const [newPlace, setNewPlace] = useState('');

  const amenitiesList = [
    { id: 'wifi', name: 'WiFi', icon: '📶' },
    { id: 'food', name: 'Food', icon: '🍽️' },
    { id: 'ac', name: 'AC', icon: '❄️' },
    { id: 'laundry', name: 'Laundry', icon: '🧺' },
    { id: 'power_backup', name: 'Power Backup', icon: '🔋' },
    { id: 'parking', name: 'Parking', icon: '🚗' },
    { id: 'security', name: '24/7 Security', icon: '🛡️' },
    { id: 'gym', name: 'Gym', icon: '🏋️' },
    { id: 'hot_water', name: 'Hot Water', icon: '🚿' },
    { id: 'cleaning', name: 'Room Cleaning', icon: '🧹' },
    { id: 'tv', name: 'TV', icon: '📺' },
    { id: 'fridge', name: 'Refrigerator', icon: '🧊' }
  ];

  const toggleAmenity = (amenityId: string) => {
    const updatedAmenities = formData.amenities.includes(amenityId)
      ? formData.amenities.filter(id => id !== amenityId)
      : [...formData.amenities, amenityId];
    
    updateFormData({ amenities: updatedAmenities });
  };

  const addNearbyPlace = () => {
    if (newPlace.trim() && !formData.nearbyPlaces.includes(newPlace.trim())) {
      updateFormData({ 
        nearbyPlaces: [...formData.nearbyPlaces, newPlace.trim()] 
      });
      setNewPlace('');
    }
  };

  const removeNearbyPlace = (place: string) => {
    updateFormData({ 
      nearbyPlaces: formData.nearbyPlaces.filter(p => p !== place) 
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addNearbyPlace();
    }
  };

  

  return (
    <div className="py-6 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Amenities & Nearby Places</h2>
        <p className="text-gray-600">What facilities do you provide?</p>
      </div>

      <div className="space-y-6">
        {/* Amenities Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Available Amenities</h3>
          <div className="grid grid-cols-2 gap-3">
            {amenitiesList.map((amenity) => (
              <button
                key={amenity.id}
                onClick={() => toggleAmenity(amenity.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  formData.amenities.includes(amenity.id)
                    ? 'border-blue-300 bg-blue-50 shadow-md transform scale-105'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="text-2xl mb-1">{amenity.icon}</div>
                <div className={`text-sm font-medium ${
                  formData.amenities.includes(amenity.id) ? 'text-blue-700' : 'text-gray-600'
                }`}>
                  {amenity.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Nearby Places Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Nearby Places</h3>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newPlace}
              onChange={(e) => setNewPlace(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Add nearby places (Metro, College, etc.)"
            />
            <button
              onClick={addNearbyPlace}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-all"
            >
              Add
            </button>
          </div>

          {formData.nearbyPlaces.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.nearbyPlaces.map((place, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2 border border-blue-200"
                >
                  <span>📍 {place}</span>
                  <button
                    onClick={() => removeNearbyPlace(place)}
                    className="text-blue-600 hover:text-red-500 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={onPrev}
          className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-300 transition-all duration-200"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default Step3Amenities;
