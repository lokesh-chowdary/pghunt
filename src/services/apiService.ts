// src/services/apiService.ts
import { getApiUrl } from '../config/api';

/**
 * API Service for handling API requests
 * This centralizes all API calls and provides consistent error handling
 */
export const apiService = {
  /**
   * Make a GET request to the API
   * @param endpoint The API endpoint to call
   * @returns The API response data
   */
  async get<T>(endpoint: string): Promise<T> {
    try {
      const token = localStorage.getItem('auth_token');
      const headers: HeadersInit = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Only log in development mode
      if (import.meta.env.DEV) {
        console.log('Making GET request to:', getApiUrl(endpoint));
      }

      const response = await fetch(getApiUrl(endpoint), {
        method: 'GET',
        headers,
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('auth_token');
          throw new Error('Authentication failed. Please log in again.');
        }
        if (response.status === 404) {
          throw new Error('Resource not found.');
        }
        throw new Error(`API request failed with status: ${response.status}`);
      }

      return await response.json() as T;
    } catch (error) {
      console.error(`API Error (GET ${endpoint}):`, error);
      throw error;
    }
  },

  /**
   * Make a POST request to the API
   * @param endpoint The API endpoint to call
   * @param data The data to send
   * @returns The API response data
   */
  async post<T>(endpoint: string, data: unknown): Promise<T> {
    try {
      const token = localStorage.getItem('auth_token');
      const headers: HeadersInit = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Only log in development mode
      if (import.meta.env.DEV) {
        console.log('Making POST request to:', getApiUrl(endpoint));
      }

      const response = await fetch(getApiUrl(endpoint), {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('auth_token');
          throw new Error('Authentication failed. Please log in again.');
        }
        throw new Error(`API request failed with status: ${response.status}`);
      }

      return await response.json() as T;
    } catch (error) {
      console.error(`API Error (POST ${endpoint}):`, error);
      throw error;
    }
  },

  /**
   * Make a PUT request to the API
   * @param endpoint The API endpoint to call
   * @param data The data to send
   * @returns The API response data
   */
  async put<T>(endpoint: string, data: unknown): Promise<T> {
    try {
      const token = localStorage.getItem('auth_token');
      const headers: HeadersInit = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Only log in development mode
      if (import.meta.env.DEV) {
        console.log('Making PUT request to:', getApiUrl(endpoint));
      }

      const response = await fetch(getApiUrl(endpoint), {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('auth_token');
          throw new Error('Authentication failed. Please log in again.');
        }
        throw new Error(`API request failed with status: ${response.status}`);
      }

      return await response.json() as T;
    } catch (error) {
      console.error(`API Error (PUT ${endpoint}):`, error);
      throw error;
    }
  },

  /**
   * Make a DELETE request to the API
   * @param endpoint The API endpoint to call
   * @returns The API response data
   */
  async delete<T>(endpoint: string): Promise<T> {
    try {
      const token = localStorage.getItem('auth_token');
      const headers: HeadersInit = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Only log in development mode
      if (import.meta.env.DEV) {
        console.log('Making DELETE request to:', getApiUrl(endpoint));
      }

      const response = await fetch(getApiUrl(endpoint), {
        method: 'DELETE',
        headers,
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('auth_token');
          throw new Error('Authentication failed. Please log in again.');
        }
        throw new Error(`API request failed with status: ${response.status}`);
      }

      return await response.json() as T;
    } catch (error) {
      console.error(`API Error (DELETE ${endpoint}):`, error);
      throw error;
    }
  },

  /**
   * Fetch CSRF cookie for Sanctum
   */
  async getCsrfCookie(): Promise<void> {
    try {
      // Only log in development mode
      if (import.meta.env.DEV) {
        console.log('Fetching CSRF cookie');
      }
      await fetch(getApiUrl('/sanctum/csrf-cookie'), {
        method: 'GET',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Error fetching CSRF cookie:', error);
      throw error;
    }
  },

  /**
   * Toggle wishlist status for a PG
   */
  async toggleWishlist(pgId: number): Promise<{ success: boolean; is_wishlisted: boolean; message?: string }> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const headers: HeadersInit = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await fetch(getApiUrl(`/wishlist/toggle/${pgId}`), {
        method: 'POST',
        headers,
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('auth_token');
          throw new Error('Authentication failed. Please log in again.');
        }
        throw new Error(`API request failed with status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error (toggle wishlist):`, error);
      throw error;
    }
  },

  /**
   * Check if a PG is wishlisted
   */
  async checkWishlist(pgId: number): Promise<{ success: boolean; is_wishlisted: boolean }> {
    try {
      const token = localStorage.getItem('auth_token');
      const headers: HeadersInit = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(getApiUrl(`/wishlist/check/${pgId}`), {
        method: 'GET',
        headers,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error (check wishlist):`, error);
      // Return false if error (user not authenticated or other error)
      return { success: true, is_wishlisted: false };
    }
  },

  /**
   * Get all wishlisted PGs
   */
  async getWishlist(): Promise<{ success: boolean; data: any[] }> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const headers: HeadersInit = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await fetch(getApiUrl('/wishlist'), {
        method: 'GET',
        headers,
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('auth_token');
          throw new Error('Authentication failed. Please log in again.');
        }
        throw new Error(`API request failed with status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error (get wishlist):`, error);
      throw error;
    }
  }
};