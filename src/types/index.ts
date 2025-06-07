export interface PG {
  id: number;
  pg_name: string;
  name?: string; // For backward compatibility
  address: string;
  city: string;
  area: string;
  category: string;
  preferred_for: string;
  phone_number: string;
  whatsapp_number?: string;
  price: number;
  rating?: number;
  type?: 'male' | 'female' | 'unisex';
  amenities: string[];
  nearby_places: string[];
  images: string[];
  youtube_link?: string;
  security_deposit: number;
  notice_period: number;
  refundable_on_exit: boolean;
  sharing_types: {
    [key: string]: { enabled: boolean; rent: string };
  };
  created_at?: string;
  updated_at?: string;
  // Legacy fields for backward compatibility
  roomTypes?: string[];
  occupancy?: string[];
}