

const initialFilters = {
  type: "",
  price: 0,
  city: "",
  amenities: {
    wifi: false,
    ac: false,
    laundry: false,
    parking: false,
  },
};

const SearchFilters = ({ filters, setFilters }) => {
  const handleClear = () => setFilters(initialFilters);

  return (
    <div
      className="w-full max-w-full sm:w-3/12 p-4 border rounded shadow mb-4 sm:mb-0 sm:mr-4 bg-white"
      style={{
        maxHeight: "80vh",
        overflowY: "auto",
        position: "sticky",
        top: "1rem",
        alignSelf: "flex-start",
        zIndex: 10,
      }}
    >
      <h2 className="text-xl font-semibold mb-4">Search Filters</h2>

      {/* Type Filter */}
      <div className="mb-4">
        <label htmlFor="typeFilter" className="block text-gray-700 font-medium mb-1">
          PG Type
        </label>
        <select
          id="typeFilter"
          className="w-full border rounded p-2"
          value={filters.type}
          onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
        >
          <option value="">All Types</option>
          <option value="boys">Boys</option>
          <option value="girls">Girls</option>
          <option value="co-ed">Co-ed</option>
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-4">
        <label htmlFor="priceFilter" className="block text-gray-700 font-medium mb-1">
          Price Range
        </label>
        <input
          type="range"
          id="priceFilter"
          min="0"
          max="10000"
          className="w-full"
          value={filters.price}
          onChange={e => setFilters(f => ({ ...f, price: Number(e.target.value) }))}
        />
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>₹0</span>
          <span>₹10,000+</span>
        </div>
        <div className="text-right text-xs text-gray-700 mt-1">
          Selected: ₹{filters.price}
        </div>
      </div>

      {/* City Filter */}
      <div className="mb-4">
        <label htmlFor="cityFilter" className="block text-gray-700 font-medium mb-1">
          City
        </label>
        <input
          type="text"
          id="cityFilter"
          className="w-full border rounded p-2"
          placeholder="Enter city..."
          value={filters.city}
          onChange={e => setFilters(f => ({ ...f, city: e.target.value }))}
        />
      </div>

      {/* Amenities Filter */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Amenities</label>
        <div className="flex flex-col gap-2 text-sm text-gray-600">
          {Object.keys(filters.amenities).map((amenity) => (
            <label key={amenity}>
              <input
                type="checkbox"
                checked={filters.amenities[amenity]}
                onChange={e =>
                  setFilters(f => ({
                    ...f,
                    amenities: { ...f.amenities, [amenity]: e.target.checked },
                  }))
                }
              />{" "}
              {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => console.log(filters)}
        >
          Apply Filters
        </button>
        <button
          className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          onClick={handleClear}
          type="button"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;