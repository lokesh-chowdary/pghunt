import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiService } from '../services/apiService';
import { PG } from '../types';
import { useAuth } from './useAuth';

interface UseUserListingsReturn {
  listings: PG[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface ApiResponse {
  success: boolean;
  data: PG[];
  message?: string;
}

/**
 * Custom hook for fetching user listings
 * Handles loading states, error handling, and authentication
 */
export const useUserListings = (): UseUserListingsReturn => {
  const [listings, setListings] = useState<PG[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { token } = useAuth();

  const fetchListings = useCallback(async () => {
    if (!token) {
      setError('Authentication required');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await apiService.get<ApiResponse>(
        '/pgs/user-listings-direct',
        token
      );

      if (response.success && response.data) {
        setListings(response.data);
      } else {
        setListings([]);
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch listings');
        }
      }
    } catch (err) {
      console.error('Error fetching user listings:', err);
      
      if (err instanceof Error) {
        if (err.message.includes('Authentication failed')) {
          toast.error('Session expired. Please log in again');
          navigate('/login', { state: { returnUrl: '/your-listings' } });
          return;
        }
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      
      setListings([]);
    } finally {
      setLoading(false);
    }
  }, [token, navigate]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  return {
    listings,
    loading,
    error,
    refetch: fetchListings,
  };
};