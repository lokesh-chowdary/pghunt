import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import ProgressBar from './ProgressBar';
import Step1PGInfo from './Step1PGInfo';
import Step2SharingRent from './Step2SharingRent';
import Step3Amenities from './Step3Amenities';
import Step4PricingMedia from './Step4PricingMedia';
import Step5Preview from './Step5Preview';
import SuccessScreen from './SuccessScreen';
import { apiService } from '../../services/apiService';
import { toast } from 'sonner';
import BackButton from '../common/BackButton';

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
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const isEditMode = !!editId;
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
      'single': { enabled: false, rent: '' },
      'double': { enabled: false, rent: '' },
      'triple': { enabled: false, rent: '' },
      'four': { enabled: false, rent: '' },
      'five+': { enabled: false, rent: '' },
    },
    amenities: [],
    nearbyPlaces: [],
    securityDeposit: '',
    noticePeriod: '',
    refundableOnExit: false,
    images: [],
    youtubeLink: '',
  });

  // Load PG data when in edit mode
  useEffect(() => {
    if (isEditMode && editId && user) {
      const fetchPgData = async () => {
        try {
          setIsLoading(true);
          const response = await apiService.get(`/edit-listing/${editId}?user_id=${user.id}`);
          
          if (response.success && response.data) {
            // Transform API data to form format
            const pgData = response.data;
            
            // Convert sharing types from array to object format
            const sharingTypesObj: {[key: string]: {enabled: boolean, rent: string}} = {};
            pgData.sharing_types.forEach((type: {type: string, enabled: boolean, rent: number | string}) => {
              sharingTypesObj[type.type] = {
                enabled: type.enabled,
                rent: type.rent.toString()
              };
            });
            
            setFormData({
              pgName: pgData.pg_name || '',
              address: pgData.address || '',
              category: pgData.category || '',
              preferredFor: pgData.preferred_for || '',
              city: pgData.city || '',
              area: pgData.area || '',
              phoneNumber: pgData.phone_number || '',
              whatsappNumber: pgData.whatsapp_number || '',
              sameAsPhone: pgData.phone_number === pgData.whatsapp_number,
              mapLocation: '',
              sharingTypes: sharingTypesObj,
              amenities: pgData.amenities || [],
              nearbyPlaces: pgData.nearby_places || [],
              securityDeposit: pgData.security_deposit?.toString() || '',
              noticePeriod: pgData.notice_period?.toString() || '',
              refundableOnExit: pgData.refundable_on_exit || false,
              images: pgData.images || [],
              youtubeLink: pgData.youtube_link || '',
            });
            
            toast.success('Listing loaded for editing');
          } else {
            toast.error('Failed to load listing data');
            navigate('/your-listings');
          }
        } catch (error) {
          console.error('Error fetching PG data:', error);
          toast.error('Failed to load listing data');
          navigate('/your-listings');
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchPgData();
    }
  }, [isEditMode, editId, user, navigate]);

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to manage your PG listings');
      navigate('/login');
      return;
    }
    
    if (user?.user_type !== 'owner') {
      toast.error('Only PG owners can list properties. Please register as a PG owner.');
      navigate('/register');
      return;
    }
  }, [isAuthenticated, user, navigate]);

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

  // Show loading while checking authentication
  if (!isAuthenticated || user?.user_type !== 'owner') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return <SuccessScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto bg-white min-h-screen shadow-xl">
        <ProgressBar currentStep={currentStep} totalSteps={5} />
        
        <div className="px-6 pb-6">
          {/* Back Button */}
          <div className="mb-4">
            <BackButton 
              text="Back" 
              variant="minimal"
            />
          </div>
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
