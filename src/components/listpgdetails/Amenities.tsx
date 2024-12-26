import React, { useState } from "react";

const amenitiesList = [
  "Wi-Fi",
  "Parking",
  "Air Conditioning",
  "Gym",
  "Laundry",
  "Security",
  "Housekeeping",
  "TV",
  "Kitchen",
  "Power Backup",
];

const Amenities = ({ handleInputChange, handleNext, handleBack }) => {
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const handleAmenityToggle = (amenity) => {
    const updatedAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((item) => item !== amenity)
      : [...selectedAmenities, amenity];

    setSelectedAmenities(updatedAmenities);
    handleInputChange("amenities", "selectedAmenities", updatedAmenities);
  };

  return (
    <div className="bg-white p-6 shadow w-full">
      <h2 className="text-2xl font-bold text-indigo-800 mb-4">Amenities</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {amenitiesList.map((amenity, index) => (
          <label
            key={index}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              value={amenity}
              checked={selectedAmenities.includes(amenity)}
              onChange={() => handleAmenityToggle(amenity)}
              className="form-checkbox text-indigo-600"
            />
            <span>{amenity}</span>
          </label>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
          onClick={handleBack}
        >
          Back
        </button>
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

export default Amenities;
