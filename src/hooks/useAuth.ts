import { useAuthStore } from '../components/store/authStore';

/**
 * Custom hook for authentication
 * Provides easy access to auth state and methods
 */
export const useAuth = () => {
  const { user, token, isAuthenticated, login, logout, setUser } = useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    setUser,
  };
};

export default useAuth;