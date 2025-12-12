import React, { useState, useEffect } from 'react';
import { PG } from '../../types';
import { getFirstImageUrl, handleImageError } from '../../utils/imageUtils';
import { MapPin, Heart, Share2 } from 'lucide-react';
import { apiService } from '../../services/apiService';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'sonner';

interface PGCardProps {
  pg: PG;
  onClick?: () => void;
}

const PGCard: React.FC<PGCardProps> = ({ pg, onClick }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  
  const pgName = pg.pg_name || pg.name || 'PG';
  const pgTypeLabel = pg.category || (pg as any).type || '';
  
  // Get lowest price from sharing types or fallback to price field
  let displayPrice = pg.price || 0;
  if (pg.sharing_types && !pg.price) {
    const enabledPrices = Object.values(pg.sharing_types)
      .filter((sharing: any) => sharing.enabled)
      .map((sharing: any) => parseInt(sharing.rent) || 0)
      .filter(price => price > 0);
    displayPrice = enabledPrices.length > 0 ? Math.min(...enabledPrices) : 0;
  }

  // Check wishlist status on mount
  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (pg.id) {
        try {
          const response = await apiService.checkWishlist(pg.id);
          setIsWishlisted(response.is_wishlisted);
        } catch (error) {
          // Silently fail - user might not be authenticated
          setIsWishlisted(false);
        }
      }
    };

    checkWishlistStatus();
  }, [pg.id]);

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.info('Please log in to add items to your wishlist');
      return;
    }

    if (!pg.id) {
      toast.error('Invalid PG listing');
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiService.toggleWishlist(pg.id);
      setIsWishlisted(response.is_wishlisted);
      toast.success(response.is_wishlisted ? 'Added to wishlist' : 'Removed from wishlist');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update wishlist';
      if (errorMessage.includes('Authentication')) {
        toast.error('Please log in to add items to your wishlist');
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="group flex flex-col rounded-2xl bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View details for ${pgName}`}
    >
      {/* Image section */}
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
            className={`w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md transition-all ${
              isWishlisted ? 'bg-rose-50' : 'hover:bg-white'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
            onClick={handleWishlistToggle}
            disabled={isLoading}
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart 
              className={`w-4 h-4 transition-all ${
                isWishlisted 
                  ? 'text-rose-500 fill-rose-500' 
                  : 'text-gray-600'
              }`} 
            />
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all"
            onClick={(e) => e.stopPropagation()}
            title="Share this PG"
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

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
            <MapPin className="w-3 h-3" />
            <p className="truncate">
              {pg.address || 'Address not available'},{' '}
              {pg.city || 'City not available'}
            </p>
          </div>

          {/* Type chip */}
          {pgTypeLabel && (
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2 py-1 rounded-full bg-[#E7F1FF] text-[11px] font-medium text-[#1D4ED8] capitalize">
                {pgTypeLabel}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PGCard;

