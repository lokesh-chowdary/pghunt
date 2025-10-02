// Mock data utilities for development and fallback scenarios

export interface MockUser {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  user_type: string;
  created_at: string;
  updated_at: string;
}

export const createMockUserProfile = (user?: {
  id?: number;
  name?: string;
  email?: string;
  phone_number?: string;
  phone?: string;
  user_type?: string;
  created_at?: string;
  updated_at?: string;
}): MockUser => {
  const now = new Date().toISOString();
  
  return {
    id: user?.id || 1,
    name: user?.name || 'Test User',
    email: user?.email || 'test@example.com',
    phone: user?.phone_number || user?.phone || '+1234567890',
    user_type: user?.user_type || 'owner',
    created_at: user?.created_at || now,
    updated_at: user?.updated_at || now,
  };
};

export const mockProfileResponse = (user?: {
  id?: number;
  name?: string;
  email?: string;
  phone_number?: string;
  phone?: string;
  user_type?: string;
  created_at?: string;
  updated_at?: string;
}) => ({
  success: true,
  message: 'Profile retrieved successfully (mock data)',
  data: createMockUserProfile(user)
});

// Mock PG listings for development
export const mockPGListings = [
  {
    id: 1,
    pg_name: 'Cozy PG in Koramangala',
    name: 'Cozy PG in Koramangala',
    address: '5th Block, Koramangala',
    city: 'Bangalore',
    price: 9000,
    images: ['https://via.placeholder.com/640x480/4F46E5/FFFFFF?text=PG+Image+1'],
    sharing_types: [
      { type: 'single', enabled: true, rent: 12000 },
      { type: 'double', enabled: true, rent: 9000 },
      { type: 'triple', enabled: false, rent: 7000 }
    ],
    amenities: ['WiFi', 'AC', 'Laundry', 'Food'],
    description: 'A comfortable PG with all modern amenities',
    user_id: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    pg_name: 'Modern PG in HSR Layout',
    name: 'Modern PG in HSR Layout',
    address: 'HSR Layout Sector 1',
    city: 'Bangalore',
    price: 12000,
    images: ['https://via.placeholder.com/640x480/10B981/FFFFFF?text=PG+Image+2'],
    sharing_types: [
      { type: 'single', enabled: true, rent: 15000 },
      { type: 'double', enabled: true, rent: 12000 }
    ],
    amenities: ['WiFi', 'AC', 'Gym', 'Food', 'Parking'],
    description: 'Premium PG with excellent facilities',
    user_id: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const mockUserListingsResponse = (userId?: number) => ({
  success: true,
  message: 'User listings retrieved successfully (mock data)',
  data: mockPGListings.filter(pg => !userId || pg.user_id === userId)
});