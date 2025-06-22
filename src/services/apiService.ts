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
   * @param token The authentication token (optional)
   * @returns The API response data
   */
  async get<T>(endpoint: string, token?: string): Promise<T> {
    try {
      const headers: HeadersInit = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      console.log('Making API request to:', getApiUrl(endpoint));
      
      const response = await fetch(getApiUrl(endpoint), {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        // Handle specific HTTP error codes
        if (response.status === 401 || response.status === 403) {
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
   * @param token The authentication token (optional)
   * @returns The API response data
   */
  async post<T>(endpoint: string, data: unknown, token?: string): Promise<T> {
    try {
      const headers: HeadersInit = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(getApiUrl(endpoint), {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
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
   * @param token The authentication token (optional)
   * @returns The API response data
   */
  async put<T>(endpoint: string, data: unknown, token?: string): Promise<T> {
    try {
      const headers: HeadersInit = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(getApiUrl(endpoint), {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
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
   * @param token The authentication token (optional)
   * @returns The API response data
   */
  async delete<T>(endpoint: string, token?: string): Promise<T> {
    try {
      const headers: HeadersInit = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(getApiUrl(endpoint), {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error('Authentication failed. Please log in again.');
        }
        
        throw new Error(`API request failed with status: ${response.status}`);
      }

      return await response.json() as T;
    } catch (error) {
      console.error(`API Error (DELETE ${endpoint}):`, error);
      throw error;
    }
  }
};