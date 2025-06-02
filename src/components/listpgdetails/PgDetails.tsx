import React from "react";

interface PGDetailsProps {
  handleInputChange: (step: string, field: string, value: unknown) => void;
  handleNext: () => void;
  handleBack: () => void;
}

const PGDetails = ({ handleInputChange, handleNext, handleBack }: PGDetailsProps) => {
  return (
    <div className="bg-white p-6 shadow w-full">
      <h2 className="text-2xl font-bold text-indigo-800 mb-4">PG Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        {/* PG Name */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">PG Name</h3>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded w-full sm:w-96 mb-2"
            placeholder="Enter PG Name"
            onChange={(e) =>
              handleInputChange("pgDetails", "name", e.target.value)
            }
          />
        </div>

        {/* PG Type */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">PG Type</h3>
          <select
            className="border border-gray-300 p-2 rounded w-full sm:w-96 mb-2"
            onChange={(e) =>
              handleInputChange("pgDetails", "type", e.target.value)
            }
          >
            <option value="">Select PG Type</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
            <option value="Co-ed">Co-ed</option>
          </select>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <textarea
            className="border border-gray-300 p-2 rounded w-full sm:w-96 mb-2"
            placeholder="Provide a brief description of the PG"
            onChange={(e) =>
              handleInputChange("pgDetails", "description", e.target.value)
            }
          />
        </div>
      </div>


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

export default PGDetails;
