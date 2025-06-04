import React from 'react';
import { PGFormData } from './AddPgForm';

interface Step5Props {
  formData: PGFormData;
  onPrev: () => void;
  onSubmit: () => void;
  goToStep: (step: number) => void;
}

const Step5Preview: React.FC<Step5Props> = ({ formData, onPrev, onSubmit, goToStep }) => {
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

  const getSelectedAmenities = () => {
    return amenitiesList.filter(amenity => formData.amenities.includes(amenity.id));
  };

  const getEnabledSharings = () => {
    return Object.entries(formData.sharingTypes).filter(([, value]) => value.enabled);
  };

  const EditButton: React.FC<{ step: number; children: React.ReactNode }> = ({ step, children }) => (
    <button
      onClick={() => goToStep(step)}
      className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors"
    >
      {children}
    </button>
  );

  return (
    <div className="py-6 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Preview Your Listing</h2>
        <p className="text-gray-600">Review all details before publishing</p>
      </div>

      <div className="space-y-6">
        {/* PG Information */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">🏠 PG Information</h3>
            <EditButton step={1}>Edit</EditButton>
          </div>
          
          <div className="space-y-3">
            <div>
              <h4 className="text-xl font-bold text-blue-700">{formData.pgName}</h4>
              <p className="text-gray-600 mt-1">{formData.address}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Category:</span>
                <span className="ml-2 font-medium">{formData.category}</span>
              </div>
              <div>
                <span className="text-gray-500">Preferred for:</span>
                <span className="ml-2 font-medium">{formData.preferredFor}</span>
              </div>
              <div>
                <span className="text-gray-500">City:</span>
                <span className="ml-2 font-medium">{formData.city}</span>
              </div>
              <div>
                <span className="text-gray-500">Area:</span>
                <span className="ml-2 font-medium">{formData.area}</span>
              </div>
              <div>
                <span className="text-gray-500">Phone:</span>
                <span className="ml-2 font-medium">{formData.phoneNumber}</span>
              </div>
              <div>
                <span className="text-gray-500">WhatsApp:</span>
                <span className="ml-2 font-medium">{formData.whatsappNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sharing & Rent */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">💰 Sharing & Rent</h3>
            <EditButton step={2}>Edit</EditButton>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {getEnabledSharings().map(([sharingType, data]) => (
              <div key={sharingType} className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
                <span className="font-medium">{sharingType} Sharing</span>
                <span className="text-lg font-bold text-blue-700">₹{data.rent}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">✨ Amenities</h3>
            <EditButton step={3}>Edit</EditButton>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {getSelectedAmenities().map((amenity) => (
              <div key={amenity.id} className="flex flex-col items-center p-2 bg-blue-50 rounded-lg">
                <span className="text-lg mb-1">{amenity.icon}</span>
                <span className="text-xs text-center font-medium">{amenity.name}</span>
              </div>
            ))}
          </div>

          {formData.nearbyPlaces.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Nearby Places:</h4>
              <div className="flex flex-wrap gap-2">
                {formData.nearbyPlaces.map((place, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    📍 {place}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pricing Policy & Media */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">💳 Pricing Policy</h3>
            <EditButton step={4}>Edit</EditButton>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Security Deposit:</span>
              <span className="ml-2 font-bold text-green-600">₹{formData.securityDeposit}</span>
            </div>
            <div>
              <span className="text-gray-500">Notice Period:</span>
              <span className="ml-2 font-medium">{formData.noticePeriod} days</span>
            </div>
          </div>
          
          <div className="mt-3">
            <span className="text-gray-500">Refundable:</span>
            <span className={`ml-2 font-medium ${formData.refundableOnExit ? 'text-green-600' : 'text-red-600'}`}>
              {formData.refundableOnExit ? 'Yes' : 'No'}
            </span>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Images ({formData.images.length}):</h4>
            <div className="text-sm text-blue-600">
              {formData.images.length} image(s) uploaded
            </div>
          </div>

          {formData.youtubeLink && (
            <div className="mt-3">
              <span className="text-gray-500">YouTube:</span>
              <span className="ml-2 text-blue-600 text-sm">Video link provided</span>
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
          onClick={onSubmit}
          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          🚀 Publish PG Listing
        </button>
      </div>
    </div>
  );
};

export default Step5Preview;
