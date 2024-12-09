import React from 'react';
import { MapPin, Star, Users, Wifi, Coffee, Car, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { PG } from '../types';

interface PGCardProps {
  pg: PG;
}

// Define icons for amenities
const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="w-4 h-4" />,
  Food: <Coffee className="w-4 h-4" />,
  Parking: <Car className="w-4 h-4" />,
  Security: <Shield className="w-4 h-4" />,
};

export default function PGCard({ pg }: PGCardProps) {
  // Destructure `pg` with fallback values for safety
  const {
    id,
    name = 'PG Name Unavailable',
    address = 'Address Unavailable',
    price = 0,
    rating = 0,
    type = 'unknown',
    amenities = [],
    images = [],
    roomTypes = [],
  } = pg;

  return (
    <Link to={`/pg/${id}`} className="block">
      <div className="group card-hover bg-white rounded-xl shadow-md overflow-hidden">
        {/* Image Section */}
        <div className="relative h-56">
          {images.length > 0 ? (
            <img
              src={images[0]} // Display the first image
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">No Image Available</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full 
            text-sm font-semibold flex items-center gap-1.5 shadow-lg"
          >
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-gray-900">{rating}</span>
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <h3
              className="text-xl font-bold text-white mb-1 group-hover:text-indigo-200 
              transition-colors duration-300"
            >
              {name}
            </h3>
            <div className="flex items-center gap-1.5 text-white/90">
              <MapPin className="w-4 h-4" />
              <p className="text-sm font-medium">{address}</p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                ₹{price.toLocaleString()}
                <span className="text-sm font-normal text-gray-500">/month</span>
              </p>
            </div>
            <div
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                type === 'male'
                  ? 'bg-blue-100 text-blue-700'
                  : type === 'female'
                  ? 'bg-pink-100 text-pink-700'
                  : type === 'unisex'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span className="capitalize">{type}</span>
              </div>
            </div>
          </div>

          {/* Amenities Section */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {amenities.slice(0, 4).map((amenity) => (
                <span
                  key={amenity}
                  className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 
                  text-gray-700 text-sm rounded-full flex items-center gap-1.5
                  transition-colors duration-200"
                >
                  {amenityIcons[amenity] || null}
                  {amenity}
                </span>
              ))}
              {amenities.length > 4 && (
                <span className="px-3 py-1.5 bg-gray-50 text-gray-600 text-sm rounded-full">
                  +{amenities.length - 4} more
                </span>
              )}
            </div>

            {/* Room Types Section */}
            <div className="flex gap-2">
              {roomTypes.length > 0 ? (
                roomTypes.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1.5 border border-indigo-100 text-indigo-600
                      bg-indigo-50/50 text-sm rounded-full"
                  >
                    {type}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No room types available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}