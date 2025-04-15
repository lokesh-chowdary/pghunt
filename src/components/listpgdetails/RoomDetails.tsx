import React from "react";

const RoomDetails = ({ handleInputChange, handleNext }) => {
  return (
    <div className="bg-white p-6 shadow w-full">
      <h2 className="text-2xl font-bold text-indigo-800 mb-4">Room Details</h2>

      {/* Grid Layout for Room Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        {/* 1st Sharing */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">1 Sharing</h3>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded w-full sm:w-96 mb-2"
            placeholder="Rent per Month"
            onChange={(e) =>
              handleInputChange("roomDetails", "sharing_1_rent", e.target.value)
            }
          />
        </div>

        {/* 2nd Sharing */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">2 Sharing</h3>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded w-full sm:w-96 mb-2"
            placeholder="Rent per Month"
            onChange={(e) =>
              handleInputChange("roomDetails", "sharing_2_rent", e.target.value)
            }
          />
        </div>

        {/* 3rd Sharing */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">3 Sharing</h3>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded w-full sm:w-96 mb-2"
            placeholder="Rent per Month"
            onChange={(e) =>
              handleInputChange("roomDetails", "sharing_3_rent", e.target.value)
            }
          />
        </div>

        {/* 4th Sharing */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">4 Sharing</h3>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded w-full sm:w-96 mb-2"
            placeholder="Rent per Month"
            onChange={(e) =>
              handleInputChange("roomDetails", "sharing_4_rent", e.target.value)
            }
          />
        </div>

        {/* Deposit */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Deposit</h3>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded w-full sm:w-96 mb-2"
            placeholder="Deposit (Refundable)"
            onChange={(e) =>
              handleInputChange("roomDetails", "deposit", e.target.value)
            }
          />
        </div>

        {/* Refund */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Refund</h3>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded w-full sm:w-96 mb-2"
            placeholder="Refund"
            onChange={(e) =>
              handleInputChange("roomDetails", "refund", e.target.value)
            }
          />
        </div>

        {/* Maintenance */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Maintenance</h3>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded w-full sm:w-96 mb-2"
            placeholder="Maintenance Charges"
            onChange={(e) =>
              handleInputChange("roomDetails", "maintenance", e.target.value)
            }
          />
        </div>
      </div>

      {/* Save & Continue Button */}
      <button
        className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
        onClick={handleNext}
      >
        Save & Continue
      </button>
    </div>
  );
};

export default RoomDetails;
