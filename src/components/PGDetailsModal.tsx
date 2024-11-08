import React from 'react';
import { X, MapPin, Star, Users, Wifi, Coffee, Car, Shield, Phone, Mail, 
  BedDouble, Home, IndianRupee, Clock } from 'lucide-react';
import type { PG } from '../types';

interface PGDetailsModalProps {
  pg: PG;
  isOpen: boolean;
  onClose: () => void;
}

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="w-5 h-5" />,
  Food: <Coffee className="w-5 h-5" />,
  Parking: <Car className="w-5 h-5" />,
  Security: <Shield className="w-5 h-5" />,
};

export default function PGDetailsModal({ pg, isOpen, onClose }: PGDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative min-h-screen md:flex md:items-center md:justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-auto 
          overflow-hidden animate-modal-up">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm
              hover:bg-gray-100 transition-colors duration-200 z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Image Gallery */}
            <div className="relative h-72 md:h-full">
              <img
                src={pg.images[0]}
                alt={pg.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-2xl font-bold text-white mb-2">{pg.name}</h2>
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="w-5 h-5" />
                  <p className="font-medium">{pg.address}</p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto scrollbar-thin">
              {/* Header Info */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-lg">{pg.rating} Rating</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{pg.price.toLocaleString()}
                    <span className="text-sm font-normal text-gray-500">/month</span>
                  </p>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-medium
                  ${pg.type === 'male' ? 'bg-blue-100 text-blue-700' :
                  pg.type === 'female' ? 'bg-pink-100 text-pink-700' :
                  'bg-purple-100 text-purple-700'}`}>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span className="capitalize">{pg.type} PG</span>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Entry Time</p>
                    <p className="font-medium">5:00 AM - 10:30 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BedDouble className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Room Types</p>
                    <p className="font-medium">{pg.roomTypes.join(', ')}</p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-4">
                  {pg.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50
                        hover:bg-gray-100 transition-colors duration-200"
                    >
                      {amenityIcons[amenity] || <Home className="w-5 h-5" />}
                      <span className="font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Pricing Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-3">
                      <IndianRupee className="w-5 h-5 text-gray-400" />
                      <span>Monthly Rent</span>
                    </div>
                    <span className="font-semibold">₹{pg.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-3">
                      <IndianRupee className="w-5 h-5 text-gray-400" />
                      <span>Security Deposit</span>
                    </div>
                    <span className="font-semibold">₹{(pg.price * 2).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="flex gap-4 pt-4">
                <button className="btn-primary flex-1 flex items-center justify-center gap-2 py-3">
                  <Phone className="w-5 h-5" />
                  Call Owner
                </button>
                <button className="btn-secondary flex-1 flex items-center justify-center gap-2 py-3">
                  <Mail className="w-5 h-5" />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}