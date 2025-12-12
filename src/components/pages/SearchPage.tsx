import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchFilters, {
  FilterState,
  initialFilters,
} from './SearchFilters';
import type { PG } from '../../types';
import { getFirstImageUrl, handleImageError } from '../../utils/imageUtils';
import { getApiUrl } from '../../config/api';
import { Filter, X, Heart, Share2, MapPin } from 'lucide-react';
import SEO from '../common/SEO';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [pgs, setPgs] = useState<PG[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [showFilters, setShowFilters] = useState(false);

  // Check for filters=open query parameter on mount and when searchParams change
  useEffect(() => {
    const filtersParam = searchParams.get('filters');
    if (filtersParam === 'open') {
      setShowFilters(true);
    }
  }, [searchParams]);

  useEffect(() => {
    axios
      .get(getApiUrl('/pgs'))
      .then(response => {
        if (response.data.success && Array.isArray(response.data.data)) {
          const data: PG[] = response.data.data;
          setPgs(data);
        } else {
          console.error('Invalid response format:', response.data);
          setPgs([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching PG data:', error);
        setPgs([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setVisibleCount(4); // Reset count when filters change
  }, [filters]);

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  const filteredPGs = (Array.isArray(pgs) ? pgs : []).filter(pg => {
    // PG Type: use category/type/preferred_for
    const pgTypeRaw = (
      (pg as any).type ||
      pg.category ||
      pg.preferred_for ||
      ''
    )
      .toString()
      .toLowerCase()
      .trim();

    const matchesType =
      !filters.type || pgTypeRaw === filters.type.toLowerCase();

    // Get price from sharing types or fallback to price field
    let pgPrice = pg.price || 0;
    if (pg.sharing_types && !pg.price) {
      const enabledSharing = Object.values(pg.sharing_types).find(
        (sharing: any) => sharing.enabled
      );
      pgPrice = enabledSharing ? parseInt(enabledSharing.rent) || 0 : 0;
    }
    const matchesPrice = pgPrice >= filters.price;

    // Amenities: filters.amenities (string[]) vs pg.amenities (string[])
    const matchesAmenities =
      filters.amenities.length === 0 ||
      filters.amenities.every(selected =>
        Array.isArray(pg.amenities) && pg.amenities.includes(selected)
      );

    return matchesType && matchesPrice && matchesAmenities;
  });

  if (loading)
    return <p className="text-center mt-10 text-lg">Loading PGs...</p>;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SearchResultsPage',
    name: 'PG Search - Find PG Accommodations',
    description: 'Search and filter PG accommodations by location, budget, type, and amenities. Find your perfect PG without brokerage fees.',
    url: typeof window !== 'undefined' ? window.location.href : ''
  };

  return (
    <>
      <SEO
        title="Search PG Accommodations - PG Finder"
        description="Search and filter PG accommodations by location, budget, type, and amenities. Find verified PG listings in Mumbai, Delhi, Bangalore, Chennai, Pune, and Hyderabad without brokerage fees."
        keywords="search PG, PG listings, filter PG, PG search, find PG, PG accommodation search"
        url="/search"
        structuredData={structuredData}
      />
      <main className="min-h-screen bg-[#F4F5FB]">
      {/* Mobile Filter Toggle Button - only on mobile */}
      <div className="md:hidden sticky top-0 z-20 bg-[#F4F5FB] border-b border-gray-200 p-4">
        <button
          onClick={() => {
            const newShowFilters = !showFilters;
            setShowFilters(newShowFilters);
            // Update URL parameter
            if (newShowFilters) {
              searchParams.set('filters', 'open');
            } else {
              searchParams.delete('filters');
            }
            setSearchParams(searchParams);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#6F3FF6] text-white rounded-full shadow-md hover:bg-[#5b31d4] transition-colors"
        >
          {showFilters ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
          {showFilters ? 'Close Filters' : 'Show Filters'}
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-0 py-6 flex flex-col gap-6">
        <div className="flex w-full flex-col md:flex-row gap-6 md:gap-8 lg:gap-16">
          {/* Filters Section */}
          <div
            className={`${
              showFilters ? 'block' : 'hidden'
            } md:block md:w-3/12 md:pr-4`}
          >
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 sticky top-20">
              <SearchFilters
                filters={filters}
                setFilters={setFilters}
                onClose={() => {
                  setShowFilters(false);
                  // Remove filters=open from URL when closing
                  if (searchParams.get('filters') === 'open') {
                    searchParams.delete('filters');
                    setSearchParams(searchParams);
                  }
                }}
              />
            </div>
          </div>

          {/* Cards Section */}
          <div className="w-full md:w-9/12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredPGs.slice(0, visibleCount).map((pg: PG) => {
                const pgName = pg.pg_name || pg.name || 'PG';

                // Display type: use category mainly
                const pgTypeLabel =
                  pg.category || (pg as any).type || '';

                // Get lowest price from sharing types or fallback to price field
                let displayPrice = pg.price || 0;
                if (pg.sharing_types && !pg.price) {
                  const enabledPrices = Object.values(pg.sharing_types)
                    .filter((sharing: any) => sharing.enabled)
                    .map((sharing: any) => parseInt(sharing.rent) || 0)
                    .filter(price => price > 0);
                  displayPrice =
                    enabledPrices.length > 0 ? Math.min(...enabledPrices) : 0;
                }

                return (
                  <div
                    key={pg.id}
                    className="group flex flex-col rounded-2xl bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
                    onClick={() => navigate(`/pg/${pg.id}`)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigate(`/pg/${pg.id}`);
                      }
                    }}
                    aria-label={`View details for ${pgName}`}
                  >
                    {/* Image section with overlays */}
                    <div className="relative w-full h-36">
                      <img
                        src={getFirstImageUrl(pg.images)}
                        alt={`${pgName} - ${pgTypeLabel || 'PG'} accommodation in ${pg.city || ''}${pg.area ? `, ${pg.area}` : ''}`}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                        loading="lazy"
                      />
                      {/* Rating badge */}
                      {pg.rating && (
                        <div className="absolute top-3 left-3 bg-white/90 rounded-full px-2.5 py-1 flex items-center gap-1 text-xs font-semibold shadow-md">
                          <span className="text-yellow-500">★</span>
                          <span>{pg.rating}</span>
                        </div>
                      )}
                      {/* Heart & share icons */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md"
                          onClick={e => e.stopPropagation()}
                        >
                          <Heart className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md"
                          onClick={e => e.stopPropagation()}
                        >
                          <Share2 className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* Content section */}
                    <div className="flex flex-col justify-between flex-1 px-4 pt-4">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-4">
                          <h2 className="text-base font-semibold truncate max-w-[70%]">
                            {pgName}
                          </h2>
                          {/* Price on the right */}
                          <div className="text-right whitespace-nowrap">
                            {displayPrice > 0 ? (
                              <p className="text-sm font-bold text-[#0BA668] leading-tight">
                                ₹{displayPrice.toLocaleString('en-IN')}
                              </p>
                            ) : (
                              <p className="text-xs text-gray-500">
                                Price on request
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Category */}
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                          <p className="truncate">
                            {pg.category || 'Category not available'}
                          </p>
                        </div>

                        {/* Location (still shown, but not filtered) */}
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                          <MapPin className="w-3 h-3" />
                          <p className="truncate">
                            {pg.address || 'Address not available'},{' '}
                            {pg.city || 'City not available'}
                          </p>
                        </div>

                        {/* Type + static chips */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          {pgTypeLabel && (
                            <span className="px-2 py-1 rounded-full bg-[#E7F1FF] text-[11px] font-medium text-[#1D4ED8] capitalize">
                              {pgTypeLabel}
                            </span>
                          )}
                          {/* <span className="px-2 py-1 rounded-full bg-[#FFF4E5] text-[11px] font-medium text-[#92400E]">
                            {pg.preferred_for || 'Professionals'}
                          </span>
                          <span className="px-2 py-1 rounded-full bg-[#E6F7EC] text-[11px] font-medium text-[#047857] border border-[#34D399]/60">
                            Verified
                          </span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Show More Button */}
            {visibleCount < filteredPGs.length && (
              <div className="w-full flex justify-center mt-8">
                <button
                  onClick={handleShowMore}
                  className="px-6 py-2 bg-[#6F3FF6] text-white rounded-full shadow-md hover:bg-[#5b31d4] transition"
                >
                  Click More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      </main>
    </>
  );
};

export default SearchPage;
