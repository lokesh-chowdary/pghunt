import React from 'react';
import { MapPin, Star, Users, Wifi, Coffee, Car, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { PG } from '../types';

interface PGCardProps {
  pg: PG;
}

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="w-4 h-4" />,
  Food: <Coffee className="w-4 h-4" />,
  Parking: <Car className="w-4 h-4" />,
  Security: <Shield className="w-4 h-4" />,
};

export default function PGCard({ pg }: PGCardProps) {
  return (
    <Link to={`/pg/${pg.id}`} className="block">
      <div className="group card-hover bg-white rounded-xl shadow-md overflow-hidden">
        <div className="relative h-56">
          <img
            src={pg.images[0]}
            alt={pg.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full 
            text-sm font-semibold flex items-center gap-1.5 shadow-lg">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-gray-900">{pg.rating}</span>
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-200 
              transition-colors duration-300">{pg.name}</h3>
            <div className="flex items-center gap-1.5 text-white/90">
              <MapPin className="w-4 h-4" />
              <p className="text-sm font-medium">{pg.address}</p>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                ₹{pg.price.toLocaleString()}
                <span className="text-sm font-normal text-gray-500">/month</span>
              </p>
            </div>
            
            <div className={`px-3 py-1.5 rounded-full text-sm font-medium
              ${pg.type === 'male' ? 'bg-blue-100 text-blue-700' :
              pg.type === 'female' ? 'bg-pink-100 text-pink-700' :
              'bg-purple-100 text-purple-700'}`}>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span className="capitalize">{pg.type}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {pg.amenities.slice(0, 4).map((amenity) => (
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
              {pg.amenities.length > 4 && (
                <span className="px-3 py-1.5 bg-gray-50 text-gray-600 text-sm rounded-full">
                  +{pg.amenities.length - 4} more
                </span>
              )}
            </div>

            <div className="flex gap-2">
              {pg.roomTypes.map((type) => (
                <span
                  key={type}
                  className="px-3 py-1.5 border border-indigo-100 text-indigo-600
                    bg-indigo-50/50 text-sm rounded-full"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}