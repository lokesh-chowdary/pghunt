export interface PG {
  id: number;
  name: string;
  address: string;
  city: string;
  price: number;
  rating: number;
  type: 'male' | 'female' | 'unisex';
  amenities: string[];
  images: string[];
  roomTypes: string[];
  occupancy: string[];
}