import React, { useState } from "react";

const cities = ["Bangalore", "Hyderabad", "Chennai"];
const areas = {
  Bangalore: ["Indiranagar", "Koramangala", "Whitefield"],
  Hyderabad: ["Madhapur", "Gachibowli", "Kukatpally"],
  Chennai: ["T. Nagar", "Velachery", "Adyar"],
};
const categories = ["Ladies", "Gents", "Colive"];
const preferredFor = ["Students", "Professionals", "Anyone"];
const sharingTypes = [1, 2, 3, 4, 5];
const amenities = [
  "WiFi", "Laundry", "TV", "Parking", "Power Backup", "Gym",
  "AC", "Non-AC", "Attached Bathroom", "Food Service"
];

export default function Filters() {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [filters, setFilters] = useState({
    amenity: [], // Make amenity an array to store multiple selections
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleFilterChange = (key, value) => {
    if (key === "amenity") {
      setFilters((prev) => {
        const newAmenities = prev[key].includes(value)
          ? prev[key].filter((item) => item !== value) // Remove the amenity if it's already selected
          : [...prev[key], value]; // Add the amenity if it's not selected

        return { ...prev, [key]: newAmenities };
      });
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  const resetFilters = () => {
    setSelectedCity("");
    setSelectedArea("");
    setFilters({
      amenity: [], // Reset amenity selection as well
    });
  };

  const renderFilterSection = () => (
    <div className="space-y-4">
      <select
        value={selectedCity}
        onChange={(e) => {
          setSelectedCity(e.target.value);
          setSelectedArea("");
        }}
        className="w-full border p-2 rounded"
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      <select
        value={selectedArea}
        onChange={(e) => setSelectedArea(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="">Select Area</option>
        {(selectedCity ? areas[selectedCity] : Object.values(areas).flat()).map((area) => (
          <option key={area} value={area}>{area}</option>
        ))}
      </select>

      <div>
        <h3 className="font-semibold mb-1">Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange("category", cat)}
              className={`px-3 py-1 rounded-full border ${filters.category === cat ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Preferred For</h3>
        <div className="flex flex-wrap gap-2">
          {preferredFor.map((pref) => (
            <button
              key={pref}
              onClick={() => handleFilterChange("preferredFor", pref)}
              className={`px-3 py-1 rounded-full border ${filters.preferredFor === pref ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`}
            >
              {pref}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Sharing Type</h3>
        <div className="flex flex-wrap gap-2">
          {sharingTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleFilterChange("sharingType", type)}
              className={`px-3 py-1 rounded-full border ${filters.sharingType === type ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`}
            >
              {type} Sharing
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Amenities</h3>
        <div className="flex flex-wrap gap-2">
          {amenities.map((item) => (
            <button
              key={item}
              onClick={() => handleFilterChange("amenity", item)}
              className={`px-3 py-1 rounded-full border ${filters.amenity.includes(item) ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex w-full">
      <div className="hidden md:block w-[27%] p-4 sticky top-0 h-screen overflow-y-auto border-r border-gray-200 bg-white">
        <div className="flex justify-between items-center mb-4 sticky top-[-17px] bg-white z-10 p-2 border-b">
          <h2 className="text-blue-600 font-bold text-xl">Filters</h2>
          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:underline"
          >
            Reset
          </button>
        </div>
        {renderFilterSection()}
      </div>

      <div className="md:hidden fixed bottom-4 right-4 z-20">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg animate-bounce"
        >
          Filters
        </button>
      </div>

      {showMobileFilters && (
        <div className="fixed inset-0 bg-white z-30 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-40 p-2 border-b">
            <h2 className="text-blue-600 font-bold text-xl">Filters</h2>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="text-sm text-blue-600 hover:underline"
            >
              Close
            </button>
          </div>
          {renderFilterSection()}
        </div>
      )}

      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 1</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 2</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 3</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 1</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 2</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 3</p>
          </div><div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 1</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 2</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 3</p>
          </div><div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 1</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 2</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 3</p>
          </div><div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 1</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 2</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 3</p>
          </div><div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 1</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 2</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 3</p>
          </div><div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 1</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 2</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 3</p>
          </div><div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 1</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 2</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 3</p>
          </div><div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 1</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 2</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 3</p>
          </div><div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 1</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 2</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 3</p>
          </div><div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 1</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 2</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 3</p>
          </div><div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 1</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 2</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 3</p>
          </div><div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 1</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 2</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 3</p>
          </div><div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 1</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 2</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 3</p>
          </div><div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 1</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 2</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 3</p>
          </div><div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 1</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 2</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 3</p>
          </div><div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 1</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 2</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 3</p>
          </div><div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 1</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 2</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 3</p>
          </div><div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 1</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 2</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 3</p>
          </div><div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 1</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 2</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 3</p>
          </div><div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 1</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 2</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 3</p>
          </div><div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 1</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 2</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-600">Property 3</p>
          </div>
        </div>
      </div>
    </div>
  );
}
