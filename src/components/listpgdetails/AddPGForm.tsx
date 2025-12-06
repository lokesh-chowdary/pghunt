import { useState, useEffect, useCallback } from 'react';
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
import { mockUserListingsResponse } from '../../utils/mockData';

export interface PGFormData {
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
  sharingTypes: { [key: string]: { enabled: boolean; rent: string } };
  amenities: string[];
  nearbyPlaces: string[];
  securityDeposit: string;
  noticePeriod: string;
  refundableOnExit: boolean;
  images: (File | string)[];
  youtubeLink: string;
}

const AddPGForm = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const userId = searchParams.get('user_id');
  const isEditMode = !!editId;
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

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
      single: { enabled: false, rent: '' },
      double: { enabled: false, rent: '' },
      triple: { enabled: false, rent: '' },
      four: { enabled: false, rent: '' },
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
  const fetchPgData = useCallback(async () => {
    if (!isEditMode || !editId || !user || !userId || hasFetched) {
      if (!hasFetched) {
        setError('Missing required parameters or authentication');
        toast.error('Invalid request parameters');
        navigate('/your-listings');
      }
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const useMockData = localStorage.getItem('use_mock_data') === 'true';
      if (useMockData) {
        const mockResponse = mockUserListingsResponse(userId);
        console.log('Mock Response:', mockResponse); // Debug mock data
        const listing = mockResponse.data.find((pg: any) => pg.id === parseInt(editId));
        if (listing) {
          setFormData({
            pgName: listing.pg_name || listing.name || 'Unnamed PG',
            address: listing.address || '',
            category: listing.category || '',
            preferredFor: listing.preferred_for || '',
            city: listing.city || '',
            area: listing.area || '',
            phoneNumber: listing.phone_number || listing.phone || '',
            whatsappNumber: listing.whatsapp_number || listing.whatsapp || listing.phone_number || listing.phone || '',
            sameAsPhone: (listing.phone_number || listing.phone) === (listing.whatsapp_number || listing.whatsapp),
            mapLocation: '',
            sharingTypes: listing.sharing_types?.reduce(
              (acc: any, type: any) => ({
                ...acc,
                [type.type]: { enabled: type.enabled, rent: type.rent?.toString() || '' },
              }),
              {}
            ) || formData.sharingTypes,
            amenities: listing.amenities || [],
            nearbyPlaces: listing.nearby_places || [],
            securityDeposit: listing.security_deposit?.toString() || '',
            noticePeriod: listing.notice_period?.toString() || '',
            refundableOnExit: listing.refundable_on_exit || false,
            images: listing.images || [],
            youtubeLink: listing.youtube_link || '',
          });
          toast.success('Loaded mock listing data');
        } else {
          throw new Error('Listing not found in mock data');
        }
        return;
      }

      // Try fetching single listing
      try {
        const response = await apiService.get<{ success: boolean; data: any }>(
          `/listings/${editId}?user_id=${userId}`
        );
        console.log('Single Listing Response:', response.data); // Debug API response
        if (response.success && response.data) {
          const pgData = response.data;
          setFormData({
            pgName: pgData.pg_name || pgData.name || 'Unnamed PG',
            address: pgData.address || '',
            category: pgData.category || '',
            preferredFor: pgData.preferred_for || '',
            city: pgData.city || '',
            area: pgData.area || '',
            phoneNumber: pgData.phone_number || pgData.phone || '',
            whatsappNumber: pgData.whatsapp_number || pgData.whatsapp || pgData.phone_number || pgData.phone || '',
            sameAsPhone: (pgData.phone_number || pgData.phone) === (pgData.whatsapp_number || pgData.whatsapp),
            mapLocation: '',
            sharingTypes: pgData.sharing_types?.reduce(
              (acc: any, type: any) => ({
                ...acc,
                [type.type]: { enabled: type.enabled, rent: type.rent?.toString() || '' },
              }),
              {}
            ) || formData.sharingTypes,
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
          throw new Error('Listing not found');
        }
      } catch (singleListingError) {
        console.warn('Single listing fetch failed, trying user-listings:', singleListingError);
        // Fallback to /user-listings endpoint
        const fallbackResponse = await apiService.get<{ success: boolean; data: any[] }>(
          `/user-listings?user_id=${userId}`
        );
        console.log('User Listings Response:', fallbackResponse.data); // Debug fallback response
        const pgData = fallbackResponse.data.find(pg => pg.id === parseInt(editId));
        if (pgData) {
          setFormData({
            pgName: pgData.pg_name || pgData.name || 'Unnamed PG',
            address: pgData.address || '',
            category: pgData.category || '',
            preferredFor: pgData.preferred_for || '',
            city: pgData.city || '',
            area: pgData.area || '',
            phoneNumber: pgData.phone_number || pgData.phone || '',
            whatsappNumber: pgData.whatsapp_number || pgData.whatsapp || pgData.phone_number || pgData.phone || '',
            sameAsPhone: (pgData.phone_number || pgData.phone) === (pgData.whatsapp_number || pgData.whatsapp),
            mapLocation: '',
            sharingTypes: pgData.sharing_types?.reduce(
              (acc: any, type: any) => ({
                ...acc,
                [type.type]: { enabled: type.enabled, rent: type.rent?.toString() || '' },
              }),
              {}
            ) || formData.sharingTypes,
            amenities: pgData.amenities || [],
            nearbyPlaces: pgData.nearby_places || [],
            securityDeposit: pgData.security_deposit?.toString() || '',
            noticePeriod: pgData.notice_period?.toString() || '',
            refundableOnExit: pgData.refundable_on_exit || false,
            images: pgData.images || [],
            youtubeLink: pgData.youtube_link || '',
          });
          toast.success('Listing loaded for editing (via user-listings)');
        } else {
          throw new Error('Listing not found in user listings');
        }
      }
    } catch (error) {
      console.error('Error fetching PG data:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load listing data';
      setError(errorMessage);
      toast.error(errorMessage);
      navigate('/your-listings');
    } finally {
      setIsLoading(false);
      setHasFetched(true);
    }
  }, [isEditMode, editId, user, userId, navigate, formData.sharingTypes, hasFetched]);

  // Check authentication and fetch data
  useEffect(() => {
    if (!isAuthenticated || !user) {
      toast.error('Please login to manage your PG listings');
      navigate('/login', { state: { returnUrl: `/list-your-pg?edit=${editId}&user_id=${userId}` } });
      return;
    }

    if (user.user_type !== 'owner') {
      toast.error('Only PG owners can list properties. Please register as a PG owner.');
      navigate('/register', { state: { returnUrl: `/list-your-pg?edit=${editId}&user_id=${userId}` } });
      return;
    }

    if (isEditMode && !hasFetched) {
      fetchPgData();
    }
  }, [isAuthenticated, user, isEditMode, navigate, fetchPgData, editId, userId, hasFetched]);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const formDataToSend = new FormData();
      formDataToSend.append('pg_name', formData.pgName);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('area', formData.area);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('preferred_for', formData.preferredFor);
      formDataToSend.append('phone_number', formData.phoneNumber);
      formDataToSend.append('whatsapp_number', formData.whatsappNumber);
      formDataToSend.append('sharing_types', JSON.stringify(formData.sharingTypes));
      formDataToSend.append('amenities', JSON.stringify(formData.amenities));
      formDataToSend.append('nearby_places', JSON.stringify(formData.nearbyPlaces));
      formDataToSend.append('security_deposit', formData.securityDeposit);
      formDataToSend.append('notice_period', formData.noticePeriod);
      formDataToSend.append('refundable_on_exit', String(formData.refundableOnExit));
      formDataToSend.append('youtube_link', formData.youtubeLink);
      formData.images.forEach((image, index) => {
        if (image instanceof File) {
          formDataToSend.append(`images[${index}]`, image);
        }
      });

      if (isEditMode && editId && userId) {
        await apiService.put(`/listings/${editId}?user_id=${userId}`, formDataToSend);
        toast.success('Listing updated successfully');
      } else {
        await apiService.post(`/listings?user_id=${userId}`, formDataToSend);
        toast.success('Listing created successfully');
      }
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting PG listing:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit listing';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (data: Partial<PGFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center max-w-md px-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Listing</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/your-listings')}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Back to Listings
            </button>
            {isEditMode && (
              <button
                onClick={() => {
                  setHasFetched(false);
                  fetchPgData();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Try Again
              </button>
            )}
          </div>
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
          <div className="mb-4">
            <BackButton text="Back" variant="minimal" />
          </div>
          <div className="transition-all duration-300 ease-in-out">
            {currentStep === 1 && (
              <Step1PGInfo formData={formData} updateFormData={updateFormData} onNext={nextStep} />
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

export default AddPGForm;