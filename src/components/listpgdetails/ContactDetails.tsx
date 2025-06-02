
interface ContactDetailsProps {
  handleInputChange: (step: string, field: string, value: unknown) => void;
  handleNext: () => void;
  handleBack: () => void;
}

const ContactDetails = ({ handleInputChange, handleNext, handleBack }: ContactDetailsProps) => {
  return (
    <div className="bg-white p-6 shadow w-full">
      <h2 className="text-2xl font-bold text-indigo-800 mb-4">Contact Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        {/* Phone Number */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Phone Number</h3>
          <input
            type="tel"
            className="border border-gray-300 p-2 rounded w-full sm:w-96 mb-2"
            placeholder="Enter Phone Number"
            onChange={(e) =>
              handleInputChange("contactDetails", "phone", e.target.value)
            }
          />
        </div>

        {/* Email Address */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Email Address</h3>
          <input
            type="email"
            className="border border-gray-300 p-2 rounded w-full sm:w-96 mb-2"
            placeholder="Enter Email Address"
            onChange={(e) =>
              handleInputChange("contactDetails", "email", e.target.value)
            }
          />
        </div>

        {/* Alternate Phone Number */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Alternate Phone Number</h3>
          <input
            type="tel"
            className="border border-gray-300 p-2 rounded w-full sm:w-96 mb-2"
            placeholder="Enter Alternate Phone Number"
            onChange={(e) =>
              handleInputChange("contactDetails", "alternatePhone", e.target.value)
            }
          />
        </div>

        {/* Contact Person */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Contact Person Name</h3>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded w-full sm:w-96 mb-2"
            placeholder="Enter Contact Person Name"
            onChange={(e) =>
              handleInputChange("contactDetails", "contactPerson", e.target.value)
            }
          />
        </div>
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

export default ContactDetails;
