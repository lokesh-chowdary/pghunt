import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Users, Wifi, Coffee, Car, Shield, Phone, Mail, 
  BedDouble, Home, IndianRupee, Clock, Calendar, Share2, Heart, 
  Navigation, CheckCircle2 } from 'lucide-react';
import type { PG } from '../types';
import '../styles/global.css';

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
  },
  "2": {
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
    <div className="pg-details-container">
      <div className="pg-details-content">
        <div className="pg-details-card">
          {/* Image Gallery */}
          <div className="pg-image-gallery">
            <img
              src={pg.images[activeImage]}
              alt={pg.name}
              className="pg-main-image"
            />
            <div className="pg-image-dots">
              {pg.images.map((_, index) => (
                <button
                  key={index}
                  className={`pg-image-dot ${index === activeImage ? 'active' : 'inactive'}`}
                  onClick={() => setActiveImage(index)}
                />
              ))}
            </div>
            <div className="pg-action-buttons">
              <button
                onClick={handleShare}
                className="pg-action-button"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`pg-action-button ${isWishlisted ? 'wishlisted' : ''}`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          <div className="pg-details-section">
            {/* Header */}
            <div className="pg-header">
              <div>
                <h1 className="pg-title">{pg.name}</h1>
                <div className="pg-location">
                  <MapPin className="w-5 h-5" />
                  <span>{pg.address}</span>
                </div>
                <div className="pg-rating">
                  <Star className="pg-rating-icon w-5 h-5" />
                  <span className="font-medium">{pg.rating}</span>
                </div>
              </div>
              <div className={`pg-type-badge ${pg.type}`}>
                <Users className="w-5 h-5" />
                <span className="capitalize">{pg.type} PG</span>
              </div>
            </div>

            {/* Amenities */}
            <div className="pg-amenities">
              <h2 className="pg-amenities-title">Amenities</h2>
              <div className="pg-amenities-grid">
                {pg.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="pg-amenity-item"
                  >
                    {amenityIcons[amenity] || <Home className="w-5 h-5" />}
                    <span className="font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="pg-rules">
              <h2 className="pg-rules-title">House Rules</h2>
              <div className="pg-rules-list">
                {[
                  "No loud music after 10 PM",
                  "Visitors allowed only in common area",
                  "No smoking inside rooms",
                  "Keep common areas clean",
                  "Follow entry/exit timings"
                ].map((rule, index) => (
                  <div key={index} className="pg-rule-item">
                    <CheckCircle2 className="pg-rule-icon w-5 h-5" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="pg-pricing">
              <h2 className="pg-amenities-title">Pricing Details</h2>
              <div className="space-y-3">
                <div className="pg-pricing-item">
                  <div className="pg-pricing-label">
                    <IndianRupee className="w-5 h-5" />
                    <span>Monthly Rent</span>
                  </div>
                  <span className="pg-pricing-value">₹{pg.price.toLocaleString()}</span>
                </div>
                <div className="pg-pricing-item">
                  <div className="pg-pricing-label">
                    <IndianRupee className="w-5 h-5" />
                    <span>Security Deposit</span>
                  </div>
                  <span className="pg-pricing-value">₹{(pg.price * 2).toLocaleString()}</span>
                </div>
                <div className="pg-pricing-item">
                  <div className="pg-pricing-label">
                    <IndianRupee className="w-5 h-5" />
                    <span>Maintenance</span>
                  </div>
                  <span className="pg-pricing-value">₹1,000</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pg-action-buttons-container">
              <button className="btn-primary pg-action-button-full">
                <Phone className="w-5 h-5" />
                Call Owner
              </button>
              <button className="btn-secondary pg-action-button-full">
                <Mail className="w-5 h-5" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}