// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000/api',
  ENDPOINTS: {
    LOGIN: '/login',
    REGISTER: '/register',
    PG_LISTINGS: '/listings', // Updated to match our backend route
    LOGOUT: '/logout',
  },
} as const;

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to create headers with auth token
export const createAuthHeaders = (token?: string | null): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

// Helper function to create headers for multipart form data
export const createMultipartHeaders = (token?: string | null): HeadersInit => {
  const headers: HeadersInit = {
    'Accept': 'application/json',
    // Important: Do NOT set Content-Type for multipart/form-data
    // The browser will set it with the correct boundary
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};