import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Star, Wifi, Coffee, Car, Shield, Home, Share2, Heart, 
  Phone, MessageCircle, IndianRupee, Calendar, Clock, CheckCircle, 
  XCircle, Youtube,  ChevronLeft, ChevronRight, GraduationCap,
  Building2, Bed, Navigation,ArrowLeft, User2, Camera, Sparkles, Info
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center bg-white rounded-2xl shadow-lg p-8 sm:p-12 max-w-md mx-4">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading PG Details</h2>
        <p className="text-gray-600">Please wait while we fetch the information...</p>
      </div>
    </div>
  );
}

if (error || !pg) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center max-w-md mx-4 bg-white rounded-2xl shadow-lg p-8 sm:p-12">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {error || 'PG not found'}
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          The PG you're looking for might have been removed or doesn't exist. Please try searching for other properties.
        </p>
        <Link 
          to="/search" 
          className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 font-medium hover:shadow-lg transform hover:-translate-y-1"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          {/* Image Gallery */}
            <div className="relative h-60 sm:h-[400px] overflow-hidden  shadow-lg">
              {/* Image */}
              <img
                src={images[activeImage]}
                alt={pgName}
                className="w-full h-full object-cover"
                onError={handleImageError}
                loading="lazy"
              />
              {/* Top Action Bar */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                <Link
                  to="/search"
                  className="bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all">
                  <ArrowLeft size={20} className="text-gray-700" />
                </Link>
                <div className="flex gap-2">
                  <button
                    onClick={handleShare}
                    className="bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all"
                    title="Share this PG"
                  >
                    <Share2 size={20} className="text-gray-700" />
                  </button>
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all"
                    title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      size={20}
                      className={isWishlisted ? "text-red-500 fill-red-500" : "text-gray-700"}
                    />
                  </button>
                </div>
              </div>

              {/* Left/Right Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all"
                  >
                    <ChevronLeft size={20} className="text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all"
                  >
                    <ChevronRight size={20} className="text-gray-700" />
                  </button>
                </>
              )}

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeImage
                        ? "bg-white scale-125 shadow-md"
                        : "bg-white/60 hover:bg-white/90"
                    }`}
                  />
                ))}
              </div>
            </div>
          {/* Content Sections */}
          <div className="p-6 sm:p-8 lg:p-12 space-y-8 sm:space-y-12">
              {/* Title & Rating Section */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{pg.name}</h1>
                  <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold text-gray-700">{pg.rating}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{pg.address}</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Location Details Card */}
                <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <MapPin size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">Location Details</h2>
                  </div>
                  <div className="space-y-3">
                    {pg.area && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                        <span className="text-sm text-gray-600">Area: <span className="ml-1 font-medium text-gray-900">{pg.area}</span></span>
                      </div>
                    )}
                    {pg.city && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                        <span className="text-sm text-gray-600">City: <span className="ml-1 font-medium text-gray-900">{pg.city}</span></span>
                      </div>
                    )}
                    {pg.address && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                        <span className="text-sm text-gray-600">Address: <span className="ml-1 font-medium text-gray-900">{pg.address}</span></span>
                      </div>
                    )}
                  </div>
                </div>

                {/* PG Information Card */}
                <div className="bg-green-50 p-5 rounded-xl border border-green-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Building2 size={20} className="text-green-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">PG Information</h2>
                  </div>
                  <div className="space-y-3">
                    {pg.category && (
                      <div className="flex items-center gap-2">
                        <User2 size={16} className="text-green-500" />
                        <span className="text-sm text-gray-600">Category: <span className="ml-1 font-medium text-gray-900">{pg.category}</span></span>
                      </div>
                    )}
                    {pg.preferred_for && (
                      <div className="flex items-center gap-2">
                        <GraduationCap size={16} className="text-green-500" />
                        <span className="text-sm text-gray-600">Preferred for: <span className="ml-1 font-medium text-gray-900">{pg.preferred_for}</span></span>
                      </div>
                    )}
                    {pg.rating && (
                      <div className="flex items-center gap-2">
                        <Star size={16} className="text-yellow-500" />
                        <span className="text-sm text-gray-600">Rating: <span className="ml-1 font-medium text-gray-900">{pg.rating}/5</span></span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            {/* Pricing & Room Types */}
              {(getEnabledSharingTypes().length > 0 || pg.price) && (
                <div className="border-b border-gray-200 pb-8 sm:pb-12">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-2 rounded-lg mr-3 shadow">
                  <Bed className="w-5 h-5 text-white" />
                </div>
                Type of Sharing & Rent
              </h3>

                  {getEnabledSharingTypes().length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {getEnabledSharingTypes().map(({ type, rent }) => (
                        <div
                          key={type}
                          className="flex flex-col items-center justify-center text-center bg-gray-50 rounded-xl p-4 shadow-sm hover:bg-gray-100 transition-all"
                        >
                          <Bed className="w-6 h-6 text-gray-600 mb-2" />
                          <div className="text-sm font-medium text-gray-800 capitalize">{type}</div>
                          <div className="text-lg font-bold text-gray-900 mt-1">₹{rent?.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">per month</div>
                        </div>
                      ))}
                    </div>
                  ) : pg.price && (
                    <div className="max-w-md mx-auto">
                      <div className="flex flex-col items-center justify-center text-center bg-gray-50 rounded-xl p-6 shadow-sm hover:bg-gray-100 transition-all">
                        <Bed className="w-8 h-8 text-gray-600 mb-3" />
                        <div className="text-base font-medium text-gray-800 mb-1">Monthly Rent</div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">₹{pg.price?.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">per month</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            {/* Amenities */}
            {pg.amenities && pg.amenities.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-2 rounded-lg mr-3 shadow">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  Amiities
                </h3>
                <div className="flex flex-wrap gap-3">
                  {pg.amenities.map((amenity, index) => {
                    const name = amenity.replace('_', ' ');
                    const icon = amenityIcons[amenity.toLowerCase()] || <Home className="w-4 h-4" />;
                    
                    return (
                      <div
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-green-200 bg-green-50 text-green-700"
                      >
                        <div className="flex-shrink-0">
                          {icon}
                        </div>
                        <span className="text-sm font-medium whitespace-nowrap capitalize">
                          {name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {/* Nearby Places */}
           {pg.nearby_places && pg.nearby_places.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-2 rounded-lg mr-3 shadow">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                Nearby Places
              </h3>
              <div className="flex flex-wrap gap-3">
                {pg.nearby_places.map((place, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-teal-50 text-teal-700 px-3 py-2 rounded-lg border border-teal-200"
                  >
                    <Navigation className="w-4 h-4" />
                    <span className="text-sm font-medium capitalize">{place}</span>
                  </div>
                ))}
              </div>
            </div>
            )}
            {/* Policies & Terms */}
            {(pg.security_deposit !== undefined || pg.notice_period !== undefined || pg.refundable_on_exit !== undefined) && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-2 rounded-lg mr-3 shadow">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                Policies & Terms
              </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {pg.security_deposit !== undefined && (
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <IndianRupee size={24} className="text-blue-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900 mb-1">Security Deposit</p>
                      <p className="text-lg font-bold text-gray-900">₹{pg.security_deposit.toLocaleString()}</p>
                    </div>
                  )}
                  {pg.notice_period !== undefined && (
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <Calendar size={24} className="text-blue-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900 mb-1">Notice Period</p>
                      <p className="text-lg font-bold text-gray-900">{pg.notice_period} days</p>
                    </div>
                  )}
                  {pg.refundable_on_exit !== undefined && (
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      {pg.refundable_on_exit ? (
                        <CheckCircle size={24} className="text-green-600 mx-auto mb-2" />
                      ) : (
                        <XCircle size={24} className="text-red-600 mx-auto mb-2" />
                      )}
                      <p className="text-sm font-medium text-gray-900 mb-1">Refundable</p>
                      <p className={`text-lg font-bold ${pg.refundable_on_exit ? 'text-green-600' : 'text-red-600'}`}>
                        {pg.refundable_on_exit ? 'Yes' : 'No'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

                      {/* YouTube Video */}
            {pg.youtube_link && (
              <div className="border-b border-gray-200 pb-8 sm:pb-12">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8 flex items-center">
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 p-3 rounded-xl mr-4 shadow-lg">
                    <Youtube className="w-6 h-6 text-white" />
                  </div>
                  Video Tour
                </h2>
                <div className="relative group">
                  <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-200 group-hover:border-red-300 transition-all duration-500">
                    <iframe
                      src={pg.youtube_link.replace('watch?v=', 'embed/')}
                      className="w-full h-full"
                      allowFullScreen
                      title="PG Video Tour"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
                </div>
              </div>
            )}
            {/* Contact Information */}
             <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-2 rounded-lg mr-3 shadow">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                Contact 
              </h3>
                {(pg.phone_number || pg.whatsapp_number) && (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                    {/* Call Button */}
                    {pg.phone_number && (
                      <a
                        href={`tel:${pg.phone_number}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-md"
                      >
                        <Phone size={18} />
                        <span>Call Now</span>
                      </a>
                    )}

                    {/* WhatsApp Button */}
                    {pg.whatsapp_number && (
                      <a
                        href={`https://wa.me/${pg.whatsapp_number.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-md"
                      >
                        <MessageCircle size={18} />
                        <span>WhatsApp</span>
                      </a>
                    )}

                    {/* Directions Button */}
                    <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-md">
                      <Navigation size={18} />
                      <span>Directions</span>
                    </button>

                    {/* 360° View Button */}
                    <button className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-md">
                      <Camera size={18} />
                      <span>360° View</span>
                    </button>
                  </div>
                )}
              {/* Additional Information */}
              {(pg.created_at || pg.updated_at) && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-2 rounded-lg mr-3 shadow">
                  <Info className="w-5 h-5 text-white" />
                </div>
                Additional Information
              </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {pg.created_at && (
                      <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <Clock size={20} className="text-gray-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-900 mb-1">Listed On</p>
                        <p className="text-sm font-semibold text-gray-700">
                          {new Date(pg.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    )}
                    {pg.updated_at && (
                      <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <Clock size={20} className="text-gray-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-900 mb-1">Updated On</p>
                        <p className="text-sm font-semibold text-gray-700">
                          {new Date(pg.updated_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}


