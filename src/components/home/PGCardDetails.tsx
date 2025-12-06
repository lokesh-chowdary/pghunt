import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Star,
  Wifi,
  Coffee,
  Car,
  Shield,
  Home,
  Share2,
  Heart,
  Phone,
  MessageCircle,
  IndianRupee,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Youtube,
  ChevronLeft,
  ChevronRight,
  Bed,
  Navigation,
  ArrowLeft,
  Camera,
  Sparkles,
  Info,
} from 'lucide-react';
import type { PG } from '../../types';
import { getAllImageUrls, handleImageError } from '../../utils/imageUtils';
import { getApiUrl } from '../../config/api';
import BackButton from '../common/BackButton';

const amenityIcons: Record<string, ReactNode> = {
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

type SharingValue = {
  enabled?: boolean;
  rent?: number | null;
};

type EnabledSharingType = {
  type: string;
  rent: number;
};

export default function PGCardDetails() {
  const { id } = useParams<{ id: string }>();

  const [activeImage, setActiveImage] = useState<number>(0);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [pg, setPg] = useState<PG | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPG = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(getApiUrl(`/pgs/${id}`), {
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) throw new Error('Failed to fetch PG details');

        const data = await response.json();

        if (data && data.data) {
          const pgData = data.data;
          setPg(pgData as PG);
        } else if (data) {
          setPg(data as PG);
        }
      } catch (err) {
        console.error('Error fetching PG details:', err);
        setError('Failed to load PG details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      void fetchPG();
    } else {
      setError('No PG ID provided');
      setLoading(false);
    }
  }, [id]);

  const handleShare = () => {
    if (!pg) return;

    const shareData = {
      title: pg.name || pg.pg_name || 'PG Details',
      text: `Check out ${pg.name || pg.pg_name || 'this PG'} on PG Hunt`,
      url: window.location.href,
    };

    const nav = navigator as Navigator & {
      share?: (data: typeof shareData) => Promise<void>;
      clipboard?: {
        writeText?: (text: string) => Promise<void>;
      };
    };

    if (nav.share) {
      nav
        .share(shareData)
        .catch(() => nav.clipboard?.writeText?.(window.location.href));
    } else {
      nav.clipboard?.writeText?.(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 sm:p-12 max-w-md mx-4">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Loading PG details
          </h2>
          <p className="text-slate-500">
            Please wait while we fetch the information...
          </p>
        </div>
      </div>
    );
  }

  if (error || !pg) {
    return (
      <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center">
        <div className="text-center max-w-md mx-4 bg-white rounded-2xl shadow-lg p-8 sm:p-12">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            {error || 'PG not found'}
          </h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            The PG you're looking for might have been removed or doesn't exist.
            Please try searching for other properties.
          </p>
          <Link
            to="/search"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 font-medium hover:shadow-md"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to search
          </Link>
        </div>
      </div>
    );
  }

  // ---- Safe helpers based on PG ----

  const images = (getAllImageUrls((pg as any).images) || []) as string[];
  const hasImages = images.length > 0;
  const safeActiveIndex =
    images.length === 0 ? 0 : Math.min(activeImage, images.length - 1);
  const activeImageUrl = hasImages ? images[safeActiveIndex] : '';

  const pgName = pg.pg_name || pg.name || 'PG Details';

  const getEnabledSharingTypes = (): EnabledSharingType[] => {
    const raw = (pg as any).sharing_types as
      | Record<string, SharingValue>
      | undefined;

    if (!raw) return [];

    return Object.entries(raw)
      .filter(([, value]) => Boolean(value?.enabled))
      .map(([key, value]) => ({
        type: key,
        rent: Number(value?.rent ?? 0),
      }));
  };

  const sharingTypes = getEnabledSharingTypes();

  const bestPrice =
    sharingTypes.length > 0
      ? Math.min(...sharingTypes.map((s) => s.rent))
      : Number((pg as any).price ?? 0);

  const securityDeposit =
    (pg as any).security_deposit != null
      ? Number((pg as any).security_deposit)
      : undefined;

  const amenities = ((pg as any).amenities ?? []) as string[];
  const nearbyPlaces = ((pg as any).nearby_places ?? []) as string[];

  const hasPricingSection =
    sharingTypes.length > 0 || (pg as any).price != null;
  const hasAmenitiesSection = amenities.length > 0;
  const hasPoliciesSection =
    securityDeposit !== undefined ||
    (pg as any).notice_period !== undefined ||
    (pg as any).refundable_on_exit !== undefined;
  const hasAdditionalInfoSection =
    (pg as any).created_at || (pg as any).updated_at;

  const showDetailSections =
    hasPricingSection ||
    hasAmenitiesSection ||
    hasPoliciesSection ||
    hasAdditionalInfoSection;

  const nextImage = () => {
    if (!images.length) return;
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (!images.length) return;
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-5 sm:py-7 lg:py-8">
       

        {/* Main layout */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-7">
            {/* Hero + Basic details + 4 sections in same card */}
            <div className="bg-white rounded-xl shadow-[0_18px_45px_rgba(15,23,42,0.08)] border border-slate-100 overflow-hidden">
              {/* Image gallery */}
              <div className="relative">
                <div className="h-60 sm:h-72 md:h-80 lg:h-80">
                  <img
                    src={activeImageUrl}
                    alt={pgName}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                    loading="lazy"
                  />
                </div>

                {/* Top action bar */}
                <div className="absolute inset-x-3 top-3 flex items-center justify-between">
                  <Link
                    to="/search"
                    className="flex items-center justify-center rounded-full bg-white/90 backdrop-blur px-2 py-1 shadow-sm hover:bg-white"
                  >
                    <ArrowLeft size={18} className="text-slate-700" />
                  </Link>
                  <div className="flex gap-2">
                    <button
                      onClick={handleShare}
                      className="flex items-center justify-center rounded-full bg-white/90 backdrop-blur p-2 shadow-sm hover:bg-white"
                      title="Share this PG"
                      type="button"
                    >
                      <Share2 size={18} className="text-slate-700" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsWishlisted((prev) => !prev)}
                      className="flex items-center justify-center rounded-full bg-white/90 backdrop-blur p-2 shadow-sm hover:bg-white"
                      title={
                        isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'
                      }
                    >
                      <Heart
                        size={18}
                        className={
                          isWishlisted
                            ? 'text-rose-500 fill-rose-500'
                            : 'text-slate-700'
                        }
                      />
                    </button>
                  </div>
                </div>

                {/* Image navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevImage}
                      className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 backdrop-blur p-2 shadow-sm hover:bg-white"
                    >
                      <ChevronLeft size={18} className="text-slate-700" />
                    </button>
                    <button
                      type="button"
                      onClick={nextImage}
                      className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 backdrop-blur p-2 shadow-sm hover:bg-white"
                    >
                      <ChevronRight size={18} className="text-slate-700" />
                    </button>
                  </>
                )}

                {/* Dots */}
                {images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveImage(index)}
                        className={`h-1.5 rounded-full transition-all ${
                          index === safeActiveIndex
                            ? 'w-4 bg-white'
                            : 'w-2 bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Basic details */}
              <div className="px-5 sm:px-6 py-4 sm:py-5 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      {(pg as any).category && (
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
                          {(pg as any).category}
                        </span>
                      )}
                      {(pg as any).preferred_for && (
                        <span className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-0.5 text-[11px] font-medium text-sky-700">
                          {(pg as any).preferred_for}
                        </span>
                      )}
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
                      {pg.name || pg.pg_name}
                    </h1>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500">
                      <span className="inline-flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {(pg as any).area && (
                          <span>{(pg as any).area}, </span>
                        )}
                        <span>{(pg as any).city}</span>
                      </span>
                      {(pg as any).address && (
                        <span className="hidden sm:inline-block">
                          • {(pg as any).address}
                        </span>
                      )}
                    </div>
                  </div>
                  {(pg as any).rating && (
                    <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 self-start">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-semibold text-slate-800">
                        {(pg as any).rating}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Basic details – sub sections (4 sections here) */}
              {showDetailSections && (
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-6 border-t border-slate-100">
                  {/* Pricing & Availability */}
                  {hasPricingSection && (
                    <section className="pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="flex items-center text-base sm:text-lg font-semibold text-slate-900">
                          <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50">
                            <Bed className="w-4 h-4 text-emerald-600" />
                          </span>
                          Pricing &amp; Availability
                        </h3>
                      </div>

                      {sharingTypes.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                          {sharingTypes.map(({ type, rent }) => (
                            <div
                              key={type}
                              className="rounded-2xl border border-slate-100 bg-slate-50/60 px-3 py-3 sm:px-4 sm:py-4 text-center hover:border-emerald-200 hover:bg-emerald-50/70 transition-colors"
                            >
                              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                                {type}
                              </p>
                              <p className="text-sm sm:text-base font-semibold text-slate-900">
                                ₹{rent.toLocaleString()}
                              </p>
                              <p className="text-[11px] text-slate-500 mt-1">
                                per month
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (pg as any).price ? (
                        <div className="max-w-sm">
                          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 px-5 py-4 sm:px-6 sm:py-5">
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1.5">
                              Monthly rent
                            </p>
                            <p className="text-xl sm:text-2xl font-semibold text-slate-900">
                              ₹{Number((pg as any).price).toLocaleString()}
                              <span className="ml-1 text-xs font-normal text-slate-500">
                                /month
                              </span>
                            </p>
                          </div>
                        </div>
                      ) : null}
                    </section>
                  )}

                  {/* Divider */}
                  {hasPricingSection &&
                    (hasAmenitiesSection ||
                      hasPoliciesSection ||
                      hasAdditionalInfoSection) && (
                      <div className="border-t border-slate-200" />
                    )}

                  {/* Amenities */}
                  {hasAmenitiesSection && (
                    <section>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="flex items-center text-base sm:text-lg font-semibold text-slate-900">
                          <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50">
                            <Sparkles className="w-4 h-4 text-emerald-600" />
                          </span>
                          Amenities
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {amenities.map((amenity, index) => {
                          const key = amenity.toLowerCase();
                          const name = amenity.replace('_', ' ');
                          const icon = amenityIcons[key] ?? (
                            <Home className="w-4 h-4" />
                          );
                          return (
                            <div
                              key={index}
                              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs sm:text-sm text-slate-700"
                            >
                              {icon}
                              <span className="capitalize">{name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  )}

                  {/* Divider */}
                  {hasAmenitiesSection &&
                    (hasPoliciesSection || hasAdditionalInfoSection) && (
                      <div className="border-t border-slate-200" />
                    )}

                  {/* Policies & Terms */}
                  {hasPoliciesSection && (
                    <section>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="flex items-center text-base sm:text-lg font-semibold text-slate-900">
                          <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50">
                            <Shield className="w-4 h-4 text-slate-700" />
                          </span>
                          Policies &amp; Terms
                        </h3>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
                        {securityDeposit !== undefined && (
                          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3 text-center">
                            <IndianRupee className="w-5 h-5 text-emerald-600 mx-auto mb-1.5" />
                            <p className="text-xs font-medium text-slate-500 mb-0.5">
                              Security deposit
                            </p>
                            <p className="text-sm sm:text-base font-semibold text-slate-900">
                              ₹{securityDeposit.toLocaleString()}
                            </p>
                          </div>
                        )}
                        {(pg as any).notice_period !== undefined && (
                          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3 text-center">
                            <Calendar className="w-5 h-5 text-sky-600 mx-auto mb-1.5" />
                            <p className="text-xs font-medium text-slate-500 mb-0.5">
                              Notice period
                            </p>
                            <p className="text-sm sm:text-base font-semibold text-slate-900">
                              {(pg as any).notice_period} days
                            </p>
                          </div>
                        )}
                        {(pg as any).refundable_on_exit !== undefined && (
                          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3 text-center">
                            {(pg as any).refundable_on_exit ? (
                              <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto mb-1.5" />
                            ) : (
                              <XCircle className="w-5 h-5 text-rose-500 mx-auto mb-1.5" />
                            )}
                            <p className="text-xs font-medium text-slate-500 mb-0.5">
                              Refundable
                            </p>
                            <p
                              className={`text-sm sm:text-base font-semibold ${
                                (pg as any).refundable_on_exit
                                  ? 'text-emerald-600'
                                  : 'text-rose-500'
                              }`}
                            >
                              {(pg as any).refundable_on_exit ? 'Yes' : 'No'}
                            </p>
                          </div>
                        )}
                      </div>
                    </section>
                  )}

                  {/* Divider */}
                  {hasPoliciesSection && hasAdditionalInfoSection && (
                    <div className="border-t border-slate-200" />
                  )}

                  {/* Additional Information */}
                  {hasAdditionalInfoSection && (
                    <section>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="flex items-center text-base sm:text-lg font-semibold text-slate-900">
                          <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50">
                            <Info className="w-4 h-4 text-slate-700" />
                          </span>
                          Additional Information
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        {(pg as any).created_at && (
                          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3 text-center">
                            <Clock className="w-4 h-4 text-slate-700 mx-auto mb-1.5" />
                            <p className="text-xs font-medium text-slate-500 mb-0.5">
                              Listed on
                            </p>
                            <p className="text-xs sm:text-sm font-semibold text-slate-800">
                              {new Date(
                                (pg as any).created_at as string,
                              ).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                        )}
                        {(pg as any).updated_at && (
                          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3 text-center">
                            <Clock className="w-4 h-4 text-slate-700 mx-auto mb-1.5" />
                            <p className="text-xs font-medium text-slate-500 mb-0.5">
                              Updated on
                            </p>
                            <p className="text-xs sm:text-sm font-semibold text-slate-800">
                              {new Date(
                                (pg as any).updated_at as string,
                              ).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                        )}
                      </div>
                    </section>
                  )}
                </div>
              )}
            </div>

            {/* Nearby places - separate card */}
            {nearbyPlaces.length > 0 && (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="flex items-center text-base sm:text-lg font-semibold text-slate-900">
                    <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50">
                      <MapPin className="w-4 h-4 text-sky-600" />
                    </span>
                    Nearby Places
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {nearbyPlaces.map((place, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-1.5 rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-xs sm:text-sm text-sky-800"
                    >
                      <Navigation className="w-4 h-4" />
                      <span className="capitalize">{place}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video tour - separate card */}
            {(pg as any).youtube_link && (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="flex items-center text-base sm:text-lg font-semibold text-slate-900">
                    <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50">
                      <Youtube className="w-4 h-4 text-rose-600" />
                    </span>
                    Video Tour
                  </h3>
                </div>
                <div className="overflow-hidden rounded-2xl border border-slate-100 bg-black/90">
                  <div className="aspect-video">
                    <iframe
                      src={(pg as any).youtube_link.replace(
                        'watch?v=',
                        'embed/',
                      )}
                      className="w-full h-full"
                      allowFullScreen
                      title="PG Video Tour"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="bg-white rounded-3xl shadow-[0_18px_45px_rgba(15,23,42,0.12)] border border-emerald-50 p-5 sm:p-6">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500 mb-1">
                  Starting from
                </p>
                <div className="flex items-baseline gap-1 mb-1">
                  <p className="text-2xl sm:text-3xl font-semibold text-slate-900">
                    ₹{bestPrice.toLocaleString()}
                  </p>
                  <span className="text-xs text-slate-500">per month</span>
                </div>

                {securityDeposit !== undefined && (
                  <p className="text-[11px] text-slate-500 mb-4">
                    Security deposit:{' '}
                    <span className="font-medium text-slate-800">
                      ₹{securityDeposit.toLocaleString()}
                    </span>
                  </p>
                )}

                <div className="space-y-2 mt-4">
                  {(pg as any).phone_number && (
                    <a
                      href={`tel:${String((pg as any).phone_number)}`}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
                    >
                      <Phone size={16} />
                      Call owner
                    </a>
                  )}
                  {(pg as any).whatsapp_number && (
                    <a
                      href={`https://wa.me/${String(
                        (pg as any).whatsapp_number,
                      ).replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors"
                    >
                      <MessageCircle size={16} />
                      WhatsApp
                    </a>
                  )}

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <Navigation size={15} />
                      <span>Directions</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <Camera size={15} />
                      <span>360° View</span>
                    </button>
                  </div>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-3">
                  <p className="text-[11px] text-slate-500">
                    No brokerage · Direct owner / property contact
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
