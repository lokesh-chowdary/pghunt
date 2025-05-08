import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Users, Wifi, Coffee, Car, Shield, Phone, Mail, 
  BedDouble, Home, IndianRupee, Clock, Calendar, Share2, Heart, 
  Navigation, CheckCircle2 } from 'lucide-react';
import type { PG } from '../types';

// Mock data - replace with API call
const mockPGs: Record<string, PG> = {
  "1": {
    id: 1,
    name: "Comfort Stay PG",
    address: "123 MG Road, Bangalore",
    city: "Bangalore",
    price: 12000,
    rating: 4.5,
    type: "male",
    amenities: ["WiFi", "AC", "Food", "Laundry", "Parking", "Security"],
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80"
    ],
    roomTypes: ["Single", "Double", "Triple"],
    occupancy: ["Single", "Double"]
  }
};

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="w-5 h-5" />,
  Food: <Coffee className="w-5 h-5" />,
  Parking: <Car className="w-5 h-5" />,
  Security: <Shield className="w-5 h-5" />,
};

export default function PGDetails() {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const pg = mockPGs[id || "1"];

  if (!pg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">PG not found</h2>
          <Link to="/" className="text-indigo-600 hover:text-indigo-500 mt-2 inline-block">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    navigator.share({
      title: pg.name,
      text: `Check out ${pg.name} on PG Hunt`,
      url: window.location.href
    }).catch(() => {
      navigator.clipboard.writeText(window.location.href);
    });
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Image Gallery */}
          <div className="relative h-[60vh]">
            <img
              src={pg.images[activeImage]}
              alt={pg.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 
              bg-black/30 backdrop-blur-sm rounded-full">
              {pg.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300
                    ${index === activeImage ? 'bg-white scale-110' : 'bg-white/50'}`}
                  onClick={() => setActiveImage(index)}
                />
              ))}
            </div>
            <div className="absolute top-6 right-6 flex gap-3">
              <button
                onClick={handleShare}
                className="p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white
                  transition-all duration-300 shadow-lg"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 shadow-lg
                  ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 hover:bg-white'}`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          <div className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{pg.name}</h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-5 h-5" />
                    <span>{pg.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{pg.rating}</span>
                  </div>
                </div>
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

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Quick Info */}
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50">
                    <Clock className="w-6 h-6 text-indigo-600" />
                    <div>
                      <p className="text-sm text-gray-500">Entry Time</p>
                      <p className="font-medium">5:00 AM - 10:30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50">
                    <BedDouble className="w-6 h-6 text-indigo-600" />
                    <div>
                      <p className="text-sm text-gray-500">Room Types</p>
                      <p className="font-medium">{pg.roomTypes.join(', ')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50">
                    <Calendar className="w-6 h-6 text-indigo-600" />
                    <div>
                      <p className="text-sm text-gray-500">Notice Period</p>
                      <p className="font-medium">1 Month</p>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h2 className="text-xl font-bold mb-4">Amenities</h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {pg.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 p-4 rounded-xl bg-gray-50
                          hover:bg-gray-100 transition-all duration-300"
                      >
                        {amenityIcons[amenity] || <Home className="w-5 h-5" />}
                        <span className="font-medium">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rules */}
                <div>
                  <h2 className="text-xl font-bold mb-4">House Rules</h2>
                  <div className="space-y-3">
                    {[
                      "No loud music after 10 PM",
                      "Visitors allowed only in common area",
                      "No smoking inside rooms",
                      "Keep common areas clean",
                      "Follow entry/exit timings"
                    ].map((rule, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map */}
                <div>
                  <h2 className="text-xl font-bold mb-4">Location</h2>
                  <div className="aspect-video rounded-xl bg-gray-100 p-4 flex items-center justify-center">
                    <div className="text-center">
                      <Navigation className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Map view coming soon</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-[89px]">
                  <div className="bg-gray-50 rounded-xl p-6 space-y-6">
                    <div>
                      <p className="text-3xl font-bold text-gray-900">
                        ₹{pg.price.toLocaleString()}
                        <span className="text-sm font-normal text-gray-500">/month</span>
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white">
                        <div className="flex items-center gap-3">
                          <IndianRupee className="w-5 h-5 text-gray-400" />
                          <span>Monthly Rent</span>
                        </div>
                        <span className="font-semibold">₹{pg.price.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white">
                        <div className="flex items-center gap-3">
                          <IndianRupee className="w-5 h-5 text-gray-400" />
                          <span>Security Deposit</span>
                        </div>
                        <span className="font-semibold">₹{(pg.price * 2).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white">
                        <div className="flex items-center gap-3">
                          <IndianRupee className="w-5 h-5 text-gray-400" />
                          <span>Maintenance</span>
                        </div>
                        <span className="font-semibold">₹1,000</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <button className="btn-primary w-full flex items-center justify-center gap-2 py-3">
                        <Phone className="w-5 h-5" />
                        Call Owner
                      </button>
                      <button className="btn-secondary w-full flex items-center justify-center gap-2 py-3">
                        <Mail className="w-5 h-5" />
                        Send Message
                      </button>
                    </div>

                    <p className="text-sm text-gray-500 text-center">
                      Usually responds within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}