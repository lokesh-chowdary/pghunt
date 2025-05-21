import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Users, Wifi, Coffee, Car, Shield, Phone, Mail, BedDouble, Home, IndianRupee, Share2, Heart, CheckCircle2 } from 'lucide-react';
import type { PG } from '../types';




const amenityIcons: Record<string, React.ReactNode> = {
WiFi: <Wifi className="w-5 h-5" />,
Food: <Coffee className="w-5 h-5" />,
Parking: <Car className="w-5 h-5" />,
Security: <Shield className="w-5 h-5" />,
};

export default function PGCardDetails() {
const { id } = useParams();
const [activeImage, setActiveImage] = useState(0);
const [isWishlisted, setIsWishlisted] = useState(false);
const [pg, setPg] = useState<PG | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchPG = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://127.0.0.1:8000/api/pgs/${id}`, {
        headers: { 'Accept': 'application/json' },
      });
      if (!response.ok) throw new Error(`Failed to fetch PG details`);
      const data = await response.json();
      setPg(data as PG);
    } catch (err) {
      setError('Failed to load PG details');
    } finally {
      setLoading(false);
    }
  };
  if (id) fetchPG();
  else {
    setError('No PG ID provided');
    setLoading(false);
  }
}, [id]);

const handleShare = () => {
  const shareData = {
    title: pg?.name || 'PG Details',
    text: `Check out ${pg?.name || 'this PG'} on PG Hunt`,
    url: window.location.href
  };
  if (navigator.share) {
    navigator.share(shareData).catch(() => {
      navigator.clipboard.writeText(window.location.href);
    });
  } else {
    navigator.clipboard.writeText(window.location.href);
  }
};

if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-gray-600">Loading...</p>
    </div>
  );
}

if (error || !pg) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">{error || 'PG not found'}</h2>
        <Link to="/" className="text-indigo-600 mt-2 inline-block underline">
          Go back home
        </Link>
      </div>
    </div>
  );
}

const images = pg.images && pg.images.length > 0
  ? pg.images
  : ['https://via.placeholder.com/600x400?text=No+Image+Available'];

return (
  <div className="max-w-5xl mx-auto p-2 sm:p-6">
    {/* Top: Image Gallery (full width on desktop) */}
    <div className="bg-white rounded-lg shadow p-2 sm:p-4 mb-6">
      <div className="relative w-full">
        <img
          src={images[activeImage]}
          alt={pg.name}
          className="w-full h-56 sm:h-80 md:h-[400px] object-cover rounded-lg transition-all duration-300"
          onError={e => {
            e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Image+Failed+to+Load';
          }}
        />
        <div className="absolute top-3 right-3 flex space-x-2 z-10">
          <button onClick={handleShare} className="p-2 rounded-full bg-white/80 hover:bg-gray-200 shadow">
            <Share2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`p-2 rounded-full shadow ${isWishlisted ? 'bg-red-100' : 'bg-white/80'} hover:bg-gray-200`}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
          </button>
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full border ${idx === activeImage ? 'bg-indigo-600 border-indigo-600' : 'bg-gray-300 border-gray-400'}`}
              onClick={() => setActiveImage(idx)}
              aria-label={`Show image ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
    {/* Bottom: Details (2 columns on desktop) */}
    <div className="bg-white rounded-lg shadow p-2 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left: Main Info */}
      <div>
        <h1 className="text-2xl font-bold mb-2">{pg.name}</h1>
        <div className="flex items-center text-gray-600 mb-2 text-base flex-wrap">
          <MapPin className="w-5 h-5 mr-1" />
          <span>{pg.address}, {pg.city}</span>
        </div>
        <div className="flex items-center mb-2 text-base">
          <Star className="w-5 h-5 text-yellow-500 mr-1" />
          <span className="font-medium">{pg.rating || 'N/A'}</span>
        </div>
        <div className="flex items-center mb-4 text-base">
          <Users className="w-5 h-5 mr-1" />
          <span className="capitalize">{pg.type} PG</span>
        </div>
        <div className="mb-4">
          <h2 className="font-semibold mb-1 text-lg">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {(pg.amenities || []).map((amenity) => (
              <span key={amenity} className="flex items-center bg-gray-100 px-3 py-1 rounded text-sm">
                {amenityIcons[amenity] || <Home className="w-4 h-4 mr-1" />}
                {amenity}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h2 className="font-semibold mb-1 text-lg">House Rules</h2>
          <ul className="space-y-1">
            {[
              "No loud music after 10 PM",
              "Visitors allowed only in common area",
              "No smoking inside rooms",
              "Keep common areas clean",
              "Follow entry/exit timings"
            ].map((rule, idx) => (
              <li key={idx} className="flex items-center text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" />
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Right: Pricing & Contact */}
      <div className="flex flex-col justify-between h-full">
        <div className="mb-6">
          <h2 className="font-semibold mb-1 text-lg">Pricing Details</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-base">
              <span className="flex items-center"><IndianRupee className="w-4 h-4 mr-1" />Monthly Rent</span>
              <span className="font-semibold">₹{(pg.price || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base">
              <span className="flex items-center"><IndianRupee className="w-4 h-4 mr-1" />Security Deposit</span>
              <span className="font-semibold">₹{((pg.price || 0) * 2).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base">
              <span className="flex items-center"><IndianRupee className="w-4 h-4 mr-1" />Maintenance</span>
              <span className="font-semibold">₹1,000</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <button className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-full sm:w-auto transition">
            <Phone className="w-5 h-5 mr-1" />
            Call Owner
          </button>
          <button className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 w-full sm:w-auto transition">
            <Mail className="w-5 h-5 mr-1" />
            Send Message
          </button>
        </div>
      </div>
    </div>
  </div>
);
}


