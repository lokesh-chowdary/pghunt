import React, { useState } from "react";
import { Camera, Contact, FolderPen, Home, ListCollapse, MapPin } from "lucide-react";  // Import Lucide Icons
import RoomDetails from "./RoomDetails";
import LocationDetails from "./LocationDetails";
import PGDetails from "./PGDetails";
import ContactDetails from "./ContactDetails";
import Photos from "./Photos";
import Amenities from "./Amenities";

const PostPG = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    roomDetails: {},
    locationDetails: {},
    pgDetails: {},
    contactDetails: {},
    photos: {},
    amenities: {},
  });

  const handleInputChange = (step, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        [field]: value,
      },
    }));
  };

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full bg-gray-100 min-h-screen pt-2">
      {/* Left Sidebar - Steps with Icons */}
      <div className="w-full md:w-1/5 bg-slate-200 border-r border-gray-200 p-4">
        <ul>
          <li
            className={`cursor-pointer mb-2 p-2 flex items-center ${
              currentStep === 1 ? "bg-indigo-200" : "hover:bg-gray-100"
            }`}
            onClick={() => setCurrentStep(1)}
          >
            <Home className="w-5 h-5 mr-2" />
              Room Details
          </li>
          <li
            className={`cursor-pointer mb-2 p-2 flex items-center ${
              currentStep === 2 ? "bg-indigo-200" : "hover:bg-gray-100"
            }`}
            onClick={() => setCurrentStep(2)}
          >
            <MapPin className="w-5 h-5 mr-2" />
             Location Details
          </li>
          <li
            className={`cursor-pointer mb-2 p-2 flex items-center ${
              currentStep === 3 ? "bg-indigo-200" : "hover:bg-gray-100"
            }`}
            onClick={() => setCurrentStep(3)}
          >
            <FolderPen className="w-5 h-5 mr-2" />
              PG Details
          </li>
          <li
            className={`cursor-pointer mb-2 p-2 flex items-center ${
              currentStep === 4 ? "bg-indigo-200" : "hover:bg-gray-100"
            }`}
            onClick={() => setCurrentStep(4)}
          >
            <Contact className="w-5 h-5 mr-2" />
             Contact Details
          </li>
          <li
            className={`cursor-pointer mb-2 p-2 flex items-center ${
              currentStep === 5 ? "bg-indigo-200" : "hover:bg-gray-100"
            }`}
            onClick={() => setCurrentStep(5)}
          >
            <Camera className="w-5 h-5 mr-2" />
             Photos
          </li>
          <li
            className={`cursor-pointer mb-2 p-2 flex items-center ${
              currentStep === 6 ? "bg-indigo-200" : "hover:bg-gray-100"
            }`}
            onClick={() => setCurrentStep(6)}
          >
            <ListCollapse className="w-5 h-5 mr-2" />
             Amenities
          </li>
        </ul>
      </div>

      {/* Right Content */}
      <div className="flex-1 overflow-auto">
        {currentStep === 1 && (
          <RoomDetails handleInputChange={handleInputChange} handleNext={handleNext} />
        )}
        {currentStep === 2 && (
          <LocationDetails
             handleInputChange={handleInputChange} 
             handleNext={handleNext}
             handleBack={handleBack}
              />
        )}
        {currentStep === 3 && (
          <PGDetails 
            handleInputChange={handleInputChange} 
            handleNext={handleNext}
            handleBack={handleBack}
             />
        )}
        {currentStep === 4 && (
          <ContactDetails
            handleInputChange={handleInputChange}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}
        {currentStep === 5 && (
          <Photos
            handleInputChange={handleInputChange}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}
        {currentStep === 6 && (
          <Amenities
            handleInputChange={handleInputChange}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default PostPG;
