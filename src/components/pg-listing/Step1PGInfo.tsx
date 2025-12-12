import React, { useState, useEffect } from 'react';
import { PGFormData } from './AddPgForm';

interface Step1Props {
  formData: PGFormData;
  updateFormData: (data: Partial<PGFormData>) => void;
  onNext: () => void;
}

const Step1PGInfo: React.FC<Step1Props> = ({ formData, updateFormData, onNext }) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Don't memoize updateFormData as it's already stable from parent
  // This was causing infinite loop by creating a new function on every render

  // Handle checkbox change for WhatsApp number being same as phone number
  const handleSameAsPhoneChange = (checked: boolean) => {
    const newValue = checked ? formData.phoneNumber : '';
    updateFormData({ 
      sameAsPhone: checked,
      whatsappNumber: newValue 
    });
  };
  useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
                   }, []);                 
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.pgName.trim()) newErrors.pgName = 'PG name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.preferredFor) newErrors.preferredFor = 'Preferred for is required';
    if (!formData.city?.trim()) newErrors.city = 'City is required';
    if (!formData.area?.trim()) newErrors.area = 'Area is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.sameAsPhone && !formData.whatsappNumber) {
      newErrors.whatsappNumber = 'WhatsApp number is required';
    }
    if (formData.mapLocation && !/^https?:\/\/.+/.test(formData.mapLocation)) {
      newErrors.mapLocation = 'Please enter a valid URL';
    }

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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">PG Information</h2>
        <p className="text-gray-600">Let's start with basic details</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            PG Name *
          </label>
          <input
            type="text"
            value={formData.pgName}
            onChange={(e) => updateFormData({ pgName: e.target.value })}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.pgName ? 'border-red-300' : 'border-gray-200'
            }`}
            placeholder="Enter PG name"
          />
          {errors.pgName && <p className="text-red-500 text-sm mt-1">{errors.pgName}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Address *
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all h-24 resize-none ${
              errors.address ? 'border-red-300' : 'border-gray-200'
            }`}
            placeholder="Enter complete address"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => updateFormData({ category: e.target.value })}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.category ? 'border-red-300' : 'border-gray-200'
              }`}
            >
              <option value="">Select</option>
              <option value="Ladies">Ladies</option>
              <option value="Gents">Gents</option>
              <option value="Co-living">Co-living</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred For *
            </label>
            <select
              value={formData.preferredFor}
              onChange={(e) => updateFormData({ preferredFor: e.target.value })}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.preferredFor ? 'border-red-300' : 'border-gray-200'
              }`}
            >
              <option value="">Select</option>
              <option value="Students">Students</option>
              <option value="Professionals">Professionals</option>
              <option value="Anyone">Anyone</option>
            </select>
            {errors.preferredFor && <p className="text-red-500 text-sm mt-1">{errors.preferredFor}</p>}
          </div>
        </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => updateFormData({ city: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.city ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="Enter City"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Area *
              </label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) => updateFormData({ area: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.area ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="Enter Area"
              />
              {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
            </div>
          </div>


        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.phoneNumber ? 'border-red-300' : 'border-gray-200'
            }`}
            placeholder="Enter 10-digit phone number"
            maxLength={10}
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
        </div>

        <div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="sameAsPhone"
              checked={formData.sameAsPhone}
              onChange={(e) => handleSameAsPhoneChange(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="sameAsPhone" className="ml-2 text-sm font-medium text-gray-700">
              WhatsApp number same as phone number
            </label>
          </div>
          
          {!formData.sameAsPhone && (
            <input
              type="tel"
              value={formData.whatsappNumber}
              onChange={(e) => updateFormData({ whatsappNumber: e.target.value })}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.whatsappNumber ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="Enter WhatsApp number"
              maxLength={10}
            />
          )}
          {errors.whatsappNumber && <p className="text-red-500 text-sm mt-1">{errors.whatsappNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Google Map Location Link
          </label>
          <input
            type="url"
            value={formData.mapLocation}
            onChange={(e) => updateFormData({ mapLocation: e.target.value })}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.mapLocation ? 'border-red-300' : 'border-gray-200'
            }`}
            placeholder="Paste Google Maps link (optional)"
          />
          {errors.mapLocation && <p className="text-red-500 text-sm mt-1">{errors.mapLocation}</p>}
        </div>
      </div>

      <button
        onClick={handleNext}
        className="w-full mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
      >
        Continue to Sharing Types →
      </button>
    </div>
  );
};

export default Step1PGInfo;
