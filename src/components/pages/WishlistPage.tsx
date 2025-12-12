import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft, RefreshCw } from 'lucide-react';
import { apiService } from '../../services/apiService';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'sonner';
import type { PG } from '../../types';
import PGCard from './PGCard';
import BackButton from '../common/BackButton';
import SEO from '../common/SEO';

const WishlistPage: React.FC = () => {
  const [wishlistedPGs, setWishlistedPGs] = useState<PG[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const fetchWishlist = useCallback(async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await apiService.getWishlist();
      
      if (response.success && Array.isArray(response.data)) {
        setWishlistedPGs(response.data);
      } else {
        setWishlistedPGs([]);
      }
    } catch (err) {
      console.error('Error fetching wishlist:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load wishlist';
      setError(errorMessage);
      setWishlistedPGs([]);
      
      if (errorMessage.includes('Authentication')) {
        toast.error('Please log in to view your wishlist');
        navigate('/login', { state: { returnUrl: '/wishlist' } });
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.info('Please log in to view your wishlist');
      navigate('/login', { state: { returnUrl: '/wishlist' } });
      return;
    }

    fetchWishlist();
  }, [isAuthenticated, navigate, fetchWishlist]);

  // Refresh wishlist when page becomes visible (e.g., user navigates back)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isAuthenticated) {
        fetchWishlist();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isAuthenticated, fetchWishlist]);

  const handlePGClick = (pg: PG) => {
    navigate(`/pg/${pg.id}`);
  };

  if (loading) {
    return (
      <>
        <SEO 
          title="My Wishlist - PGHunt"
          description="View all your favorite PG listings"
        />
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-4 mb-6">
              <BackButton />
              <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
            </div>
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <RefreshCw className="w-8 h-8 text-gray-400 animate-spin" />
                <p className="text-gray-500">Loading your wishlist...</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error && !isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <>
      <SEO 
        title="My Wishlist - PGHunt"
        description="View all your favorite PG listings"
      />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <BackButton />
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
              </div>
            </div>
            <button
              onClick={fetchWishlist}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title="Refresh wishlist"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {/* Error State */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && wishlistedPGs.length === 0 && !error && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-gray-500 text-center max-w-md mb-6">
                Start exploring PGs and add your favorites to your wishlist by clicking the heart icon.
              </p>
              <button
                onClick={() => navigate('/search')}
                className="px-6 py-3 bg-[#0BA668] text-white font-medium rounded-lg hover:bg-[#0a9558] transition-colors"
              >
                Browse PGs
              </button>
            </div>
          )}

          {/* Wishlist Grid */}
          {wishlistedPGs.length > 0 && (
            <>
              <div className="mb-4">
                <p className="text-gray-600">
                  {wishlistedPGs.length} {wishlistedPGs.length === 1 ? 'PG' : 'PGs'} in your wishlist
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistedPGs.map((pg) => (
                  <PGCard
                    key={pg.id}
                    pg={pg}
                    onClick={() => handlePGClick(pg)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistPage;

