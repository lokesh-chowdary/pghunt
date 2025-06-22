import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { getFirstImageUrl, handleImageError } from '../../utils/imageUtils';
import { apiService } from '../../services/apiService';
import type { PG } from '../../types';
import { mockUserListingsResponse } from '../../utils/mockData';
import BackButton from '../common/BackButton';
import { 
  Building2, 
  MapPin, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Calendar,
  Users,
  Star,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

const YourListings = () => {
  const [listings, setListings] = useState<PG[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, token } = useAuthStore();
  const navigate = useNavigate();

  // Memoize fetchUserListings to prevent recreation on every render
  const fetchUserListings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!token) {
        throw new Error('Authentication token missing');
      }
      
      // Check if mock data is enabled
      const useMockData = localStorage.getItem('use_mock_data') === 'true';
      
      if (useMockData) {
        // Use mock data directly
        const mockResponse = mockUserListingsResponse(user?.id);
        setListings(mockResponse.data);
        toast.success('Listings loaded (mock data)');
        return;
      }
      
      // Use endpoint that accepts user_id parameter instead of requiring authentication
      const data = await apiService.get<{success: boolean, data: PG[]}>(`/user-listings?user_id=${user?.id}`);
      
      if (data.success && Array.isArray(data.data)) {
        setListings(data.data);
      } else {
        setListings([]);
        // If we got a successful response but no listings, show info message
        if (data.success) {
          toast.info('You have no listings yet');
        }
      }
    } catch (err) {
      console.error('Error fetching user listings:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load your listings';
      const is500Error = errorMessage.includes('500') || errorMessage.includes('Internal Server Error');
      
      if (is500Error) {
        // Use mock data as fallback for 500 errors
        const mockResponse = mockUserListingsResponse(user?.id);
        setListings(mockResponse.data);
        toast.warning('Listings endpoint unavailable. Showing sample data.');
        setError(null); // Clear error since we have fallback data
      } else {
        setError(errorMessage);
        setListings([]);
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  // Check if user is logged in when component mounts
  useEffect(() => {
    if (!user || !token) {
      toast.error('Please log in to view your listings');
      navigate('/login', { state: { returnUrl: '/your-listings' } });
      return;
    }
    
    fetchUserListings();
  }, [user, token, navigate, fetchUserListings]);

  // Memoize handleDeleteListing to prevent recreation on every render
  const handleDeleteListing = useCallback(async (pgId: number) => {
    if (!confirm('Are you sure you want to delete this listing?')) {
      return;
    }

    try {
      if (!user) {
        toast.error('You need to be logged in to delete listings');
        navigate('/login', { state: { returnUrl: '/your-listings' } });
        return;
      }

      // Show delete in progress toast
      toast.loading('Deleting listing...');
      
      // Use our centralized API service to delete the listing - now with the user_id parameter
      await apiService.delete(`/delete-listing/${pgId}?user_id=${user.id}`);
      
      // Remove from local state
      setListings(prev => prev.filter(pg => pg.id !== pgId));
      toast.dismiss();
      toast.success('Listing deleted successfully');
    } catch (err) {
      toast.dismiss();
      console.error('Error deleting listing:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to delete listing');
    }
  }, [user, navigate]);
  
  // Handle editing a listing
  const handleEditListing = useCallback(async (pgId: number) => {
    try {
      if (!user) {
        toast.error('You need to be logged in to edit listings');
        navigate('/login', { state: { returnUrl: '/your-listings' } });
        return;
      }
      
      // Navigate to the edit page with the listing ID
      navigate(`/list-your-pg?edit=${pgId}`);
    } catch (err) {
      console.error('Error navigating to edit page:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to open edit page');
    }
  }, [user, navigate]);

  // Memoize helper functions to improve performance
  const getEnabledSharingTypes = useCallback((pg: PG) => {
    if (!pg.sharing_types) return [];
    
    // Check if sharing_types is an array or object and handle accordingly
    if (Array.isArray(pg.sharing_types)) {
      return pg.sharing_types
        .filter(sharing => sharing.enabled)
        .map(sharing => ({
          type: sharing.type,
          rent: sharing.rent
        }));
    } else {
      // Handle as object
      return Object.entries(pg.sharing_types)
        .filter(([, sharing]) => sharing.enabled)
        .map(([type, sharing]) => ({
          type,
          rent: sharing.rent
        }));
    }
  }, []);

  const getLowestPrice = useCallback((pg: PG) => {
    const sharingTypes = getEnabledSharingTypes(pg);
    if (sharingTypes.length > 0) {
      const prices = sharingTypes.map(s => parseInt(s.rent.toString()) || 0).filter(p => p > 0);
      return prices.length > 0 ? Math.min(...prices) : pg.price || 0;
    }
    return pg.price || 0;
  }, [getEnabledSharingTypes]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 mb-2">Loading your listings...</p>
          {user && (
            <div className="flex items-center justify-center text-sm text-gray-500">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span>Retrieving listings for {user.name || 'your account'}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show error state if there's an error
  if (error) {
    const is500Error = error.includes('500');
    
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="text-red-500 mb-4">
            <Building2 className="w-16 h-16 mx-auto mb-2" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Listings</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          
          {is500Error && (
            <div className="bg-yellow-50 p-4 rounded-lg mb-4 text-left">
              <h3 className="font-medium text-yellow-800 mb-1">Backend Error Detected</h3>
              <p className="text-sm text-yellow-700 mb-2">
                The API endpoint for user listings may not be implemented yet.
              </p>
              
              <div className="bg-white p-3 rounded border border-yellow-200 text-sm">
                <p className="font-medium text-gray-800 mb-1">Solutions:</p>
                <ul className="list-disc ml-4 text-gray-700 space-y-1">
                  <li>Check if the backend server is running</li>
                  <li>Verify your authentication token is valid</li>
                  <li>Contact support if the issue persists</li>
                </ul>
              </div>
            </div>
          )}
          
          <div className="flex justify-center">
            <button
              onClick={fetchUserListings}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <div className="mb-6">
          <BackButton text="Back" />
        </div>
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Listings</h1>
              <div className="flex items-center text-gray-600">
                {user && (
                  <div className="flex items-center mr-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="font-medium">{user.name || 'User'}</span>
                  </div>
                )}
                <span>
                  Manage your PG listings • {listings.length} listing{listings.length !== 1 ? 's' : ''}
                </span>
                <div className="flex items-center ml-2">
                  <button 
                    onClick={() => {
                      toast.info('Refreshing listings...');
                      fetchUserListings();
                    }}
                    className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs flex items-center transition-colors"
                    title="Refresh listings"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Refresh
                  </button>
                </div>
              </div>
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
                          {pg.created_at ? new Date(pg.created_at).toLocaleDateString() : 
                           pg.updated_at ? new Date(pg.updated_at).toLocaleDateString() : 'N/A'}
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
                        onClick={() => handleEditListing(pg.id)}
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