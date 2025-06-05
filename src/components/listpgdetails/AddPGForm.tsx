import  { useState } from 'react';
import ProgressBar from './ProgressBar';
import Step1PGInfo from './Step1PGInfo';
import Step2SharingRent from './Step2SharingRent';
import Step3Amenities from './Step3Amenities';
import Step4PricingMedia from './Step4PricingMedia';
import Step5Preview from './Step5Preview';
import SuccessScreen from './SuccessScreen';

export interface PGFormData {
  // Step 1
  pgName: string;
  address: string;
  city: string;
  area: string;
  category: string;
  preferredFor: string;
  phoneNumber: string;
  whatsappNumber: string;
  sameAsPhone: boolean;
  mapLocation: string;
  
  // Step 2
  sharingTypes: {
    [key: string]: { enabled: boolean; rent: string };
  };
  
  // Step 3
  amenities: string[];
  nearbyPlaces: string[];
  
  // Step 4
  securityDeposit: string;
  noticePeriod: string;
  refundableOnExit: boolean;
  images: File[];
  youtubeLink: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<PGFormData>({
    pgName: '',
    address: '',
    category: '',
    preferredFor: '',
    city: '',
    area: '',
    phoneNumber: '',
    whatsappNumber: '',
    sameAsPhone: false,
    mapLocation: '',
    sharingTypes: {
      '1': { enabled: false, rent: '' },
      '2': { enabled: false, rent: '' },
      '3': { enabled: false, rent: '' },
      '4': { enabled: false, rent: '' },
      '5': { enabled: false, rent: '' },
    },
    amenities: [],
    nearbyPlaces: [],
    securityDeposit: '',
    noticePeriod: '',
    refundableOnExit: false,
    images: [],
    youtubeLink: '',
  });

  const updateFormData = (data: Partial<PGFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
     window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
     window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleSubmit = () => {
    console.log('Submitting PG listing:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <SuccessScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto bg-white min-h-screen shadow-xl">
        <ProgressBar currentStep={currentStep} totalSteps={5} />
        
        <div className="px-6 pb-6">
          <div className="transition-all duration-300 ease-in-out">
            {currentStep === 1 && (
              <Step1PGInfo 
                formData={formData} 
                updateFormData={updateFormData}
                onNext={nextStep}
              />
            )}
            {currentStep === 2 && (
              <Step2SharingRent 
                formData={formData} 
                updateFormData={updateFormData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {currentStep === 3 && (
              <Step3Amenities 
                formData={formData} 
                updateFormData={updateFormData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {currentStep === 4 && (
              <Step4PricingMedia 
                formData={formData} 
                updateFormData={updateFormData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {currentStep === 5 && (
              <Step5Preview 
                formData={formData}
                onPrev={prevStep}
                onSubmit={handleSubmit}
                goToStep={goToStep}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
