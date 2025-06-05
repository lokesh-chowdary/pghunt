import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Users, Wifi, Coffee, Car, Shield, Home, Share2, Heart } from 'lucide-react';
import type { PG } from '../../types';




const amenityIcons: Record<string, React.ReactNode> = {
WiFi: <Wifi className="w-5 h-5" />,
Food: <Coffee className="w-5 h-5" />,
Parking: <Car className="w-5 h-5" />,
Security: <Shield className="w-5 h-5" />,
};

export default function PGCardDetails() {
const { id } = useParams();
const [activeImage] = useState(0);
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
    } catch {
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
      </div>
       {/* PG Name , Address , City , Rating PG , Type */}
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
      </div>
      {/* Aminities */}
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
   
    </div>
     
  </div>
);
}


