import React from "react";

const LocationDetails = ({ handleInputChange, handleNext, handleBack }) => {
  return (
    <div className="bg-white p-6 shadow w-full">
      <h2 className="text-2xl font-bold text-indigo-800 mb-4">Location Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        {/* Address */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Address</h3>
          <textarea
            className="border border-gray-300 p-2 rounded w-full sm:w-96 mb-2"
            placeholder="Enter the full address"
            onChange={(e) =>
              handleInputChange("locationDetails", "address", e.target.value)
            }
          />
        </div>

        {/* City */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">City</h3>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded w-full sm:w-96 mb-2"
            placeholder="City"
            onChange={(e) =>
              handleInputChange("locationDetails", "city", e.target.value)
            }
          />
        </div>

        {/* State */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">State</h3>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded w-full sm:w-96 mb-2"
            placeholder="State"
            onChange={(e) =>
              handleInputChange("locationDetails", "state", e.target.value)
            }
          />
        </div>

        {/* ZIP Code */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">ZIP Code</h3>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded w-full sm:w-96 mb-2"
            placeholder="ZIP Code"
            onChange={(e) =>
              handleInputChange("locationDetails", "zip", e.target.value)
            }
          />
        </div>

        {/* Landmark */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Landmark</h3>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded w-full sm:w-96 mb-2"
            placeholder="Landmark (Optional)"
            onChange={(e) =>
              handleInputChange("locationDetails", "landmark", e.target.value)
            }
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        {/* Back Button */}
        <button
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
          onClick={handleBack}
        >
          Back
        </button>

        {/* Save & Continue Button */}
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          onClick={handleNext}
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default LocationDetails;
