import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Star, Users, Wifi, Coffee, Car, Shield, Home, Share2, Heart, 
  Phone, MessageCircle, IndianRupee, Calendar, Clock, CheckCircle, 
  XCircle, MapIcon, Youtube, Camera, ChevronLeft, ChevronRight,
  Building2, UserCheck, Bed, Navigation
} from 'lucide-react';
import type { PG } from '../../types';
import { getAllImageUrls, handleImageError } from '../../utils/imageUtils';
import { getApiUrl } from '../../config/api';




const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="w-5 h-5" />,
  food: <Coffee className="w-5 h-5" />,
  parking: <Car className="w-5 h-5" />,
  security: <Shield className="w-5 h-5" />,
  ac: <div className="w-5 h-5 text-blue-500">❄️</div>,
  laundry: <div className="w-5 h-5">🧺</div>,
  power_backup: <div className="w-5 h-5">🔋</div>,
  gym: <div className="w-5 h-5">🏋️</div>,
  hot_water: <div className="w-5 h-5">🚿</div>,
  cleaning: <div className="w-5 h-5">🧹</div>,
  tv: <div className="w-5 h-5">📺</div>,
  fridge: <div className="w-5 h-5">🧊</div>,
};

export default function PGCardDetails() {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [pg, setPg] = useState<PG | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchPG = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(getApiUrl(`/pgs/${id}`), {
        headers: { 'Accept': 'application/json' },
      });
      if (!response.ok) throw new Error(`Failed to fetch PG details`);
      const data = await response.json();
      
      // Console log the complete response
      console.log('=== PG API Response ===');
      console.log('Complete Response:', data);
      console.log('Success:', data.success);
      
      // Console log specific fields from the nested data
      if (data && data.data) {
        const pgData = data.data;
        console.log('=== PG Details ===');
        console.log('PG Name:', pgData.name || pgData.pg_name);
        console.log('PG Address:', pgData.address);
        console.log('PG City:', pgData.city);
        console.log('PG Area:', pgData.area);
        console.log('PG ID:', pgData.id);
        console.log('Phone Number:', pgData.phone_number);
        console.log('WhatsApp Number:', pgData.whatsapp_number);
        console.log('Category:', pgData.category);
        console.log('Preferred For:', pgData.preferred_for);
        console.log('Amenities:', pgData.amenities);
        console.log('Nearby Places:', pgData.nearby_places);
        console.log('Price:', pgData.price);
        console.log('Security Deposit:', pgData.security_deposit);
        console.log('Notice Period:', pgData.notice_period);
        console.log('Refundable on Exit:', pgData.refundable_on_exit);
        console.log('YouTube Link:', pgData.youtube_link);
        console.log('Images:', pgData.images);
        console.log('Created At:', pgData.created_at);
        console.log('Updated At:', pgData.updated_at);
        console.log('=== All PG Data ===');
        console.log(pgData);
        
        // Set the nested data
        setPg(pgData as PG);
      } else if (data) {
        // Fallback if data is not nested
        console.log('=== PG Details (Direct) ===');
        console.log('PG Name:', data.name || data.pg_name);
        console.log('PG Address:', data.address);
        console.log('=== All Data ===');
        console.log(data);
        setPg(data as PG);
      }
    } catch (error) {
      console.error('Error fetching PG details:', error);
      setError('Failed to load PG details');
    } finally {
      setLoading(false);
    }
  };
  if (id) fetchPG();
  else {
    setError('No PG ID provided');
    setLoading(false);
  }
}, [id]);

const handleShare = () => {
  const shareData = {
    title: pg?.name || 'PG Details',
    text: `Check out ${pg?.name || 'this PG'} on PG Hunt`,
    url: window.location.href
  };
  if (navigator.share) {
    navigator.share(shareData).catch(() => {
      navigator.clipboard.writeText(window.location.href);
    });
  } else {
    navigator.clipboard.writeText(window.location.href);
  }
};

if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">Loading PG details...</p>
      </div>
    </div>
  );
}

if (error || !pg) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <XCircle className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {error || 'PG not found'}
        </h2>
        <p className="text-gray-600 mb-6">
          The PG you're looking for might have been removed or doesn't exist.
        </p>
        <Link 
          to="/search" 
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Search
        </Link>
      </div>
    </div>
  );
}

  const images = getAllImageUrls(pg.images);
  const pgName = pg.pg_name || pg.name || 'PG Details';

  // Helper function to get enabled sharing types with prices
  const getEnabledSharingTypes = () => {
    if (!pg.sharing_types) return [];
    return Object.entries(pg.sharing_types)
      .filter(([, value]) => value.enabled)
      .map(([key, value]) => ({
        type: key,
        rent: value.rent
      }));
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <Link 
          to="/search" 
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Search
        </Link>
        <div className="flex space-x-2">
          <button 
            onClick={handleShare} 
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`p-2 rounded-full transition-colors ${
              isWishlisted ? 'bg-red-100 text-red-600' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={images[activeImage]}
            alt={pgName}
            className="w-full h-64 md:h-96 object-cover"
            onError={handleImageError}
            loading="lazy"
          />
          
          {/* Image Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              
              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === activeImage ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          
          {/* Image Counter */}
          <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            <Camera className="w-4 h-4 inline mr-1" />
            {activeImage + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* Complete PG Details - All Database Information */}
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Basic Information Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{pgName}</h1>
          
          {/* Location & Basic Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Location Information */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
                Location Details
              </h3>
              {pg.address && (
                <div className="flex items-start">
                  <span className="font-medium text-gray-700 w-20 flex-shrink-0">Address:</span>
                  <span className="text-gray-600">{pg.address}</span>
                </div>
              )}
              {pg.area && (
                <div className="flex items-start">
                  <span className="font-medium text-gray-700 w-20 flex-shrink-0">Area:</span>
                  <span className="text-gray-600">{pg.area}</span>
                </div>
              )}
              {pg.city && (
                <div className="flex items-start">
                  <span className="font-medium text-gray-700 w-20 flex-shrink-0">City:</span>
                  <span className="text-gray-600">{pg.city}</span>
                </div>
              )}
            </div>

            {/* PG Type & Category */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-indigo-600" />
                PG Information
              </h3>
              {pg.category && (
                <div className="flex items-start">
                  <span className="font-medium text-gray-700 w-20 flex-shrink-0">Category:</span>
                  <span className="text-gray-600 capitalize">{pg.category}</span>
                </div>
              )}
              {pg.preferred_for && (
                <div className="flex items-start">
                  <span className="font-medium text-gray-700 w-20 flex-shrink-0">For:</span>
                  <span className="text-gray-600 capitalize">{pg.preferred_for}</span>
                </div>
              )}
              {pg.rating && (
                <div className="flex items-start">
                  <span className="font-medium text-gray-700 w-20 flex-shrink-0">Rating:</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-gray-600">{pg.rating}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information Card */}
        {(pg.phone_number || pg.whatsapp_number) && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-indigo-600" />
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pg.phone_number && (
                <a
                  href={`tel:${pg.phone_number}`}
                  className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors group"
                >
                  <Phone className="w-6 h-6 text-green-600 mr-3 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="font-semibold text-green-800">Call Now</div>
                    <div className="text-sm text-green-600">{pg.phone_number}</div>
                  </div>
                </a>
              )}
              {pg.whatsapp_number && (
                <a
                  href={`https://wa.me/${pg.whatsapp_number.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors group"
                >
                  <MessageCircle className="w-6 h-6 text-green-600 mr-3 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="font-semibold text-green-800">WhatsApp</div>
                    <div className="text-sm text-green-600">{pg.whatsapp_number}</div>
                  </div>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Pricing & Room Types Card */}
        {(getEnabledSharingTypes().length > 0 || pg.price) && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Bed className="w-5 h-5 mr-2 text-indigo-600" />
              Room Types & Pricing
            </h2>
            {getEnabledSharingTypes().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getEnabledSharingTypes().map(({ type, rent }) => (
                  <div key={type} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 text-center hover:shadow-md transition-all">
                    <div className="text-lg font-semibold text-gray-800 capitalize mb-2">
                      {type} Sharing
                    </div>
                    <div className="text-2xl font-bold text-indigo-600">
                      ₹{rent}
                      <span className="text-sm text-gray-500 font-normal">/month</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : pg.price && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 text-center max-w-sm mx-auto">
                <div className="text-lg font-semibold text-gray-800 mb-2">Monthly Rent</div>
                <div className="text-2xl font-bold text-indigo-600">
                  ₹{pg.price}
                  <span className="text-sm text-gray-500 font-normal">/month</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Amenities Card */}
        {pg.amenities && pg.amenities.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Home className="w-5 h-5 mr-2 text-indigo-600" />
              Amenities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {pg.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors">
                  {amenityIcons[amenity.toLowerCase()] || <Home className="w-4 h-4 mr-2 text-gray-600" />}
                  <span className="text-sm font-medium capitalize">{amenity.replace('_', ' ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nearby Places Card */}
        {pg.nearby_places && pg.nearby_places.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <MapIcon className="w-5 h-5 mr-2 text-indigo-600" />
              Nearby Places
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {pg.nearby_places.map((place, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg border">
                  <Navigation className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm capitalize">{place}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Policies & Terms Card */}
        {(pg.security_deposit !== undefined || pg.notice_period !== undefined || pg.refundable_on_exit !== undefined) && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-indigo-600" />
              Policies & Terms
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pg.security_deposit !== undefined && (
                <div className="bg-gray-50 p-4 rounded-lg border text-center">
                  <IndianRupee className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-800">Security Deposit</div>
                  <div className="text-lg font-bold text-gray-900">₹{pg.security_deposit}</div>
                </div>
              )}
              {pg.notice_period !== undefined && (
                <div className="bg-gray-50 p-4 rounded-lg border text-center">
                  <Calendar className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-800">Notice Period</div>
                  <div className="text-lg font-bold text-gray-900">{pg.notice_period} days</div>
                </div>
              )}
              {pg.refundable_on_exit !== undefined && (
                <div className="bg-gray-50 p-4 rounded-lg border text-center">
                  {pg.refundable_on_exit ? (
                    <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
                  )}
                  <div className="font-medium text-gray-800">Deposit Refundable</div>
                  <div className={`text-lg font-bold ${pg.refundable_on_exit ? 'text-green-600' : 'text-red-600'}`}>
                    {pg.refundable_on_exit ? 'Yes' : 'No'}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* YouTube Video Card */}
        {pg.youtube_link && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Youtube className="w-5 h-5 mr-2 text-red-600" />
              Video Tour
            </h2>
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                src={pg.youtube_link.replace('watch?v=', 'embed/')}
                className="w-full h-full"
                allowFullScreen
                title="PG Video Tour"
              />
            </div>
          </div>
        )}

        {/* Additional Information Card */}
        {(pg.created_at || pg.updated_at || pg.description) && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-indigo-600" />
              Additional Information
            </h2>
            
            {/* Description */}
            {pg.description && (
              <div className="mb-4">
                <h3 className="font-medium text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{pg.description}</p>
              </div>
            )}

            {/* Listing Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {pg.created_at && (
                <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <Clock className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-gray-600">Listed on {new Date(pg.created_at).toLocaleDateString()}</span>
                </div>
              )}
              {pg.updated_at && (
                <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <Clock className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-gray-600">Updated on {new Date(pg.updated_at).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Owner Information Card (if available) */}
        {(pg.owner_name || pg.owner_email) && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <UserCheck className="w-5 h-5 mr-2 text-indigo-600" />
              Owner Information
            </h2>
            <div className="space-y-3">
              {pg.owner_name && (
                <div className="flex items-start">
                  <span className="font-medium text-gray-700 w-20 flex-shrink-0">Name:</span>
                  <span className="text-gray-600">{pg.owner_name}</span>
                </div>
              )}
              {pg.owner_email && (
                <div className="flex items-start">
                  <span className="font-medium text-gray-700 w-20 flex-shrink-0">Email:</span>
                  <span className="text-gray-600">{pg.owner_email}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


