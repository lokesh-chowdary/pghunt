import React, { useState } from 'react';
import { PGFormData } from './AddPgForm';

interface Step4Props {
  formData: PGFormData;
  updateFormData: (data: Partial<PGFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const Step4PricingMedia: React.FC<Step4Props> = ({ formData, updateFormData, onNext, onPrev }) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length > 0) {
      updateFormData({ images: [...formData.images, ...files] });
      
      // Create previews
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreviews(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
    updateFormData({ images: newImages });
    setImagePreviews(newPreviews);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.securityDeposit) {
      newErrors.securityDeposit = 'Security deposit is required';
    }
    if (!formData.noticePeriod) {
      newErrors.noticePeriod = 'Notice period is required';
    }
    if (formData.images.length === 0) {
      newErrors.images = 'At least one image is required';
    }
    if (formData.youtubeLink && !/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+/.test(formData.youtubeLink)) {
      newErrors.youtubeLink = 'Please enter a valid YouTube URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="py-6 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Pricing Policy & Media</h2>
        <p className="text-gray-600">Set your pricing and upload images</p>
      </div>

      <div className="space-y-6">
        {/* Pricing Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            💰 Pricing Policy
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Security Deposit (₹) *
              </label>
              <input
                type="number"
                value={formData.securityDeposit}
                onChange={(e) => updateFormData({ securityDeposit: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.securityDeposit ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="5000"
                min="0"
              />
              {errors.securityDeposit && <p className="text-red-500 text-sm mt-1">{errors.securityDeposit}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Notice Period (Days) *
              </label>
              <input
                type="number"
                value={formData.noticePeriod}
                onChange={(e) => updateFormData({ noticePeriod: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.noticePeriod ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="30"
                min="1"
              />
              {errors.noticePeriod && <p className="text-red-500 text-sm mt-1">{errors.noticePeriod}</p>}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="refundable"
              checked={formData.refundableOnExit}
              onChange={(e) => updateFormData({ refundableOnExit: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="refundable" className="ml-2 text-sm font-medium text-gray-700">
              Security deposit is refundable on exit
            </label>
          </div>
        </div>

        {/* Image Upload Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            📸 PG Images *
          </h3>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-all">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="text-4xl mb-2">📷</div>
              <p className="text-gray-600 font-medium">Tap to upload PG images</p>
              <p className="text-sm text-gray-500 mt-1">Choose multiple images (JPG, PNG)</p>
            </label>
          </div>

          {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mt-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-xl border-2 border-gray-200"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-all"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* YouTube Link */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            YouTube Video Link (Optional)
          </label>
          <input
            type="url"
            value={formData.youtubeLink}
            onChange={(e) => updateFormData({ youtubeLink: e.target.value })}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.youtubeLink ? 'border-red-300' : 'border-gray-200'
            }`}
            placeholder="https://youtube.com/watch?v=..."
          />
          {errors.youtubeLink && <p className="text-red-500 text-sm mt-1">{errors.youtubeLink}</p>}
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
          onClick={handleNext}
          className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          Preview →
        </button>
      </div>
    </div>
  );
};

export default Step4PricingMedia;
