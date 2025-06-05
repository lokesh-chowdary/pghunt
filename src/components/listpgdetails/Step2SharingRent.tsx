import React, { useState } from 'react';
import { PGFormData } from './AddPgForm';

interface Step2Props {
  formData: PGFormData;
  updateFormData: (data: Partial<PGFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const Step2SharingRent: React.FC<Step2Props> = ({ formData, updateFormData, onNext, onPrev }) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const toggleSharing = (sharingType: string) => {
    const newSharingTypes = {
      ...formData.sharingTypes,
      [sharingType]: {
        ...formData.sharingTypes[sharingType],
        enabled: !formData.sharingTypes[sharingType].enabled,
        rent: formData.sharingTypes[sharingType].enabled ? '' : formData.sharingTypes[sharingType].rent
      }
    };
    updateFormData({ sharingTypes: newSharingTypes });
  };

  const updateRent = (sharingType: string, rent: string) => {
    const newSharingTypes = {
      ...formData.sharingTypes,
      [sharingType]: {
        ...formData.sharingTypes[sharingType],
        rent
      }
    };
    updateFormData({ sharingTypes: newSharingTypes });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const enabledSharings = Object.entries(formData.sharingTypes).filter(([, value]) => value.enabled);

    if (enabledSharings.length === 0) {
      newErrors.sharing = 'Please select at least one sharing type';
    }

    enabledSharings.forEach(([key, value]) => {
      if (!value.rent || value.rent === '0') {
        newErrors[`rent_${key}`] = 'Rent amount is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
       window.scrollTo({ top: 0, behavior: 'smooth' });
      onNext();
    }
  };

  return (
    <div className="py-6 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Sharing Types & Rent</h2>
        <p className="text-gray-600">Select sharing options and set rent</p>
      </div>

      <div className="space-y-4">
        {Object.entries(formData.sharingTypes).map(([sharingType, data]) => (
          <div
            key={sharingType}
            className={`border-2 rounded-xl p-4 transition-all duration-300 ${
              data.enabled 
                ? 'border-blue-300 bg-blue-50 shadow-md transform scale-105' 
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <button
                  onClick={() => toggleSharing(sharingType)}
                  className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                    data.enabled 
                      ? 'bg-blue-500 border-blue-500' 
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {data.enabled && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                <span className="ml-3 text-lg font-semibold text-gray-700">
                  {sharingType} Sharing
                </span>
              </div>
              
              <div className="flex items-center">
                <span className="text-2xl">
                  {sharingType === '1' ? '👤' : sharingType === '2' ? '👥' : sharingType === '3' ? '👨‍👩‍👦' : sharingType === '4' ? '👨‍👩‍👧‍👦' : '🏠'}
                </span>
              </div>
            </div>

            {data.enabled && (
              <div className="animate-fade-in">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Rent Amount (₹)
                </label>
                <input
                  type="number"
                  value={data.rent}
                  onChange={(e) => updateRent(sharingType, e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors[`rent_${sharingType}`] ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="Enter rent amount"
                  min="1"
                />
                {errors[`rent_${sharingType}`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`rent_${sharingType}`]}</p>
                )}
              </div>
            )}
          </div>
        ))}

        {errors.sharing && (
          <div className="text-center">
            <p className="text-red-500 text-sm">{errors.sharing}</p>
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={onPrev}
          className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-300 transition-all duration-200"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default Step2SharingRent;
