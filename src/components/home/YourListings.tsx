import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { getApiUrl } from '../../config/api';
import { getFirstImageUrl, handleImageError } from '../../utils/imageUtils';
import type { PG } from '../../types';
import { 
  Building2, 
  MapPin, 
  IndianRupee, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Calendar,
  Users,
  Star,
  Phone
} from 'lucide-react';
import { toast } from 'sonner';

const YourListings = () => {
  const [listings, setListings] = useState<PG[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, token } = useAuthStore();

  useEffect(() => {
    fetchUserListings();
  }, []);

  const fetchUserListings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(getApiUrl('/pgs/user-listings'), {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch your listings');
      }

      const data = await response.json();
      
      // Console log for debugging
      console.log('=== User Listings Response ===');
      console.log('Response:', data);
      
      if (data.success && Array.isArray(data.data)) {
        setListings(data.data);
      } else {
        setListings([]);
      }
    } catch (err) {
      console.error('Error fetching user listings:', err);
      setError(err instanceof Error ? err.message : 'Failed to load your listings');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteListing = async (pgId: number) => {
    if (!confirm('Are you sure you want to delete this listing?')) {
      return;
    }

    try {
      const response = await fetch(getApiUrl(`/pgs/${pgId}`), {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete listing');
      }

      // Remove from local state
      setListings(prev => prev.filter(pg => pg.id !== pgId));
      toast.success('Listing deleted successfully');
    } catch (err) {
      console.error('Error deleting listing:', err);
      toast.error('Failed to delete listing');
    }
  };

  const getEnabledSharingTypes = (pg: PG) => {
    if (!pg.sharing_types) return [];
    
    return Object.entries(pg.sharing_types)
      .filter(([, sharing]) => sharing.enabled)
      .map(([type, sharing]) => ({
        type,
        rent: sharing.rent
      }));
  };

  const getLowestPrice = (pg: PG) => {
    const sharingTypes = getEnabledSharingTypes(pg);
    if (sharingTypes.length > 0) {
      const prices = sharingTypes.map(s => parseInt(s.rent) || 0).filter(p => p > 0);
      return prices.length > 0 ? Math.min(...prices) : pg.price || 0;
    }
    return pg.price || 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your listings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <Building2 className="w-16 h-16 mx-auto mb-2" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Listings</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchUserListings}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Listings</h1>
              <p className="text-gray-600">
                Manage your PG listings • {listings.length} listing{listings.length !== 1 ? 's' : ''}
              </p>
            </div>
            <Link
              to="/list-your-pg"
              className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Listing
            </Link>
          </div>
        </div>

        {/* Listings Grid */}
        {listings.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No listings yet</h3>
            <p className="text-gray-600 mb-6">Start by creating your first PG listing</p>
            <Link
              to="/list-your-pg"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Listing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((pg) => {
              const pgName = pg.pg_name || pg.name || 'PG';
              const lowestPrice = getLowestPrice(pg);
              const sharingTypes = getEnabledSharingTypes(pg);

              return (
                <div key={pg.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                  
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={getFirstImageUrl(pg.images)}
                      alt={pgName}
                      className="w-full h-48 object-cover"
                      onError={handleImageError}
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Active
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    
                    {/* Title & Price */}
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{pgName}</h3>
                      <div className="text-right ml-2">
                        <div className="text-lg font-bold text-blue-600">
                          ₹{lowestPrice}
                        </div>
                        <div className="text-xs text-gray-500">per month</div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span className="text-sm truncate">{pg.address}, {pg.city}</span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                      <div className="bg-gray-50 rounded-lg p-2">
                        <Users className="w-4 h-4 text-gray-600 mx-auto mb-1" />
                        <div className="text-xs text-gray-600">{sharingTypes.length} Types</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <Star className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
                        <div className="text-xs text-gray-600">{pg.rating || 'N/A'}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <Calendar className="w-4 h-4 text-gray-600 mx-auto mb-1" />
                        <div className="text-xs text-gray-600">
                          {pg.created_at ? new Date(pg.created_at).toLocaleDateString() : 'N/A'}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link
                        to={`/pg/${pg.id}`}
                        className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Link>
                      <button
                        onClick={() => {
                          // TODO: Implement edit functionality
                          toast.info('Edit functionality coming soon!');
                        }}
                        className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteListing(pg.id)}
                        className="flex items-center justify-center px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default YourListings;