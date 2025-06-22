import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { apiService } from '../../services/apiService';
import { toast } from 'sonner';
import { User, Mail, Phone, Lock, Save, Loader2 } from 'lucide-react';
import { createMockUserProfile } from '../../utils/mockData';
import BackButton from '../common/BackButton';

interface UserProfileData {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  user_type?: string;
  created_at: string;
  updated_at: string;
}

const UserProfile = () => {
  const { user, token, setUser } = useAuthStore();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changePassword, setChangePassword] = useState(false);
  
  const fetchUserProfile = useCallback(async () => {
    try {
      setLoading(true);
      
      // Check if mock data is enabled
      const useMockData = localStorage.getItem('use_mock_data') === 'true';
      
      if (useMockData && user) {
        // Use mock data directly
        const mockData = createMockUserProfile(user);
        setProfileData(mockData);
        setName(mockData.name);
        setEmail(mockData.email);
        setPhone(mockData.phone || '');
        toast.success('Profile loaded (mock data)');
        return;
      }
      
      // Use our centralized API service to fetch the profile
      const data = await apiService.get('/profile', token);
      
      if (data.success && data.data) {
        setProfileData(data.data);
        
        // Initialize form fields
        setName(data.data.name || '');
        setEmail(data.data.email || '');
        setPhone(data.data.phone || '');
      } else {
        toast.error('Failed to load profile data');
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
      
      // Check if it's a 500 error and provide fallback
      const errorMessage = err instanceof Error ? err.message : 'Failed to load profile';
      const is500Error = errorMessage.includes('500') || errorMessage.includes('Internal Server Error');
      
      if (is500Error) {
        // Use user data from auth store as fallback
        if (user) {
          const fallbackData = createMockUserProfile(user);
          
          setProfileData(fallbackData);
          setName(fallbackData.name);
          setEmail(fallbackData.email);
          setPhone(fallbackData.phone || '');
          
          toast.warning('Profile endpoint unavailable. Using cached user data.');
        } else {
          toast.error('Profile service temporarily unavailable. Please try logging in again.');
        }
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [token, user]);
  
  useEffect(() => {
    if (!user || !token) {
      toast.error('Please log in to view your profile');
      navigate('/login', { state: { returnUrl: '/profile' } });
      return;
    }
    
    fetchUserProfile();
  }, [user, token, navigate, fetchUserProfile]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      
      // Form validation
      if (changePassword) {
        if (!currentPassword) {
          toast.error('Current password is required');
          return;
        }
        
        if (newPassword !== confirmPassword) {
          toast.error('New passwords do not match');
          return;
        }
        
        if (newPassword.length < 8) {
          toast.error('Password must be at least 8 characters');
          return;
        }
      }
      
      const payload: Record<string, string> = {
        name,
        email,
        phone: phone || '',
      };
      
      if (changePassword) {
        payload.current_password = currentPassword;
        payload.new_password = newPassword;
        payload.new_password_confirmation = confirmPassword;
      }
      
      const response = await fetch(getApiUrl('/profile'), {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      
      if (response.status === 401 || response.status === 403) {
        toast.error('Session expired. Please log in again');
        navigate('/login', { state: { returnUrl: '/profile' } });
        return;
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 422 && data.errors) {
          // Validation errors
          const firstError = Object.values(data.errors)[0];
          toast.error(Array.isArray(firstError) ? firstError[0] : 'Validation error');
        } else {
          toast.error(data.message || 'Failed to update profile');
        }
        return;
      }
      
      if (data.success) {
        toast.success('Profile updated successfully');
        
        // Update local state
        setProfileData(data.data);
        
        // Update user in auth store
        if (setUser && user) {
          setUser({
            ...user,
            name: data.data.name,
            email: data.data.email,
          });
        }
        
        // Reset password fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setChangePassword(false);
      } else {
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Back Button */}
        <div className="mb-6">
          <BackButton text="Back" />
        </div>
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
          <p className="text-gray-600">
            Manage your personal information and password
          </p>
        </div>
        
        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your full name"
                  />
                </div>
              </div>
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your phone number"
                  />
                </div>
              </div>
              
              {/* Password Toggle */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center">
                  <input
                    id="change-password"
                    name="change-password"
                    type="checkbox"
                    checked={changePassword}
                    onChange={(e) => setChangePassword(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="change-password" className="ml-2 block text-sm text-gray-900">
                    Change password
                  </label>
                </div>
              </div>
              
              {/* Password Fields */}
              {changePassword && (
                <div className="space-y-6 pt-2">
                  {/* Current Password */}
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your current password"
                      />
                    </div>
                  </div>
                  
                  {/* New Password */}
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="New password (min. 8 characters)"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Password must be at least 8 characters long
                    </p>
                  </div>
                  
                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Confirm your new password"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      Saving changes...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
        
        {/* Account Details */}
        {profileData && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Account ID</span>
                <span className="font-medium">{profileData.id}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Member Since</span>
                <span className="font-medium">
                  {new Date(profileData.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Last Updated</span>
                <span className="font-medium">
                  {new Date(profileData.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;