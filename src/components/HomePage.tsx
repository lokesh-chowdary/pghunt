import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Building2, 
  ChevronDown, 
  Navigation, 
  Clock as QuickStay,
  UserCircle2 as Male,
  UserCircle as Female,
  Users2 as CoLive,
  Search, 
  Calendar, 
  ArrowRight, 
  Check, 
  Home, 
  FileText, 
  Shield, 
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [propertyType, setPropertyType] = useState('Gents');
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/search');
  };

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune', 'Hyderabad'];
  
  const areasByCity: { [key: string]: string[] } = {
    'Mumbai': ['Andheri', 'Bandra', 'Colaba', 'Dadar', 'Powai'],
    'Delhi': ['Connaught Place', 'Dwarka', 'Hauz Khas', 'Lajpat Nagar', 'Rohini'],
    'Bangalore': ['Koramangala', 'Indiranagar', 'HSR Layout', 'Whitefield', 'Electronic City'],
    'Chennai': ['T Nagar', 'Adyar', 'Anna Nagar', 'Velachery', 'OMR'],
    'Pune': ['Kothrud', 'Hinjewadi', 'Baner', 'Viman Nagar', 'Magarpatta'],
    'Hyderabad': ['Hitech City', 'Gachibowli', 'Madhapur', 'Banjara Hills', 'Jubilee Hills']
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedArea(''); // Reset area when city changes
  };

  // ===== Features Section: Horizontal scroll on mobile =====
  const featuresScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = featuresScrollRef.current;
    if (!container) return;

    let isHovered = false;

    const handleMouseEnter = () => {
      isHovered = true;
    };

    const handleMouseLeave = () => {
      isHovered = false;
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    const autoScroll = () => {
      if (!container) return;

      if (isHovered || container.scrollWidth <= container.clientWidth) {
        return; // pause on hover or if not scrollable
      }

      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const amount = container.clientWidth * 0.9;
      const next = container.scrollLeft + amount;

      if (next >= maxScrollLeft) {
        // Reached the end → instant jump back to start (no reverse animation)
        const prevBehavior = container.style.scrollBehavior;
        container.style.scrollBehavior = 'auto';
        container.scrollLeft = 0;

        // Restore smooth scroll on next frame
        requestAnimationFrame(() => {
          container.style.scrollBehavior = prevBehavior || 'smooth';
        });
      } else {
        container.scrollTo({ left: next, behavior: 'smooth' });
      }
    };

    const id = window.setInterval(autoScroll, 4000); // 4 seconds

    return () => {
      window.clearInterval(id);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const scrollFeaturesByCard = (direction: 'left' | 'right') => {
    const container = featuresScrollRef.current;
    if (!container) return;

    const amount = container.clientWidth * 0.9;
    const next =
      direction === 'left'
        ? container.scrollLeft - amount
        : container.scrollLeft + amount;

    container.scrollTo({ left: next, behavior: 'smooth' });
  };

  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-pgfinder-primary to-pgfinder-secondary"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-8">
            The Ultimate PG Search & Management PLatform
          </h1>

          {/* Search Box */}
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-4xl mx-auto shadow-xl">
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-lg ${
                  propertyType === 'Gents' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                } transition-colors flex items-center justify-center gap-2`}
                onClick={() => setPropertyType('Gents')}
              >
                <Male className="h-5 w-5" />
                <span>Gents</span>
              </button>
              <button
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-lg ${
                  propertyType === 'Ladies' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                } transition-colors flex items-center justify-center gap-2`}
                onClick={() => setPropertyType('Ladies')}
              >
                <Female className="h-5 w-5" />
                <span>Ladies</span>
              </button>
              <button
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-lg ${
                  propertyType === 'CoLive' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                } transition-colors flex items-center justify-center gap-2`}
                onClick={() => setPropertyType('CoLive')}
              >
                <CoLive className="h-5 w-5" />
                <span>CoLive</span>
              </button>

              <button
                className={`px-3 sm:px-6 py-3 rounded-lg ${
                  propertyType === 'QuickStay' ? 'bg-green-500 text-white' : 'bg-gray-100'
                } transition-colors flex items-center justify-center gap-2`}
                onClick={() => setPropertyType('QuickStay')}
              >
                <QuickStay className="h-5 w-5" />
                <span>24 Hr</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-3 h-6 w-6 text-gray-400" />
                <select
                  className="w-full pl-12 pr-4 py-3 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={selectedCity}
                  onChange={(e) => handleCityChange(e.target.value)}
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 h-6 w-6 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative flex-1">
                <Building2 className="absolute left-3 top-3 h-6 w-6 text-gray-400" />
                <select
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    !selectedCity ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  disabled={!selectedCity}
                >
                  <option value="">Select Area</option>
                  {selectedCity && areasByCity[selectedCity]?.map((area) => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 h-6 w-6 text-gray-400 pointer-events-none" />
              </div>
              <div className="flex gap-2">
                <button
                  className="flex-1 sm:flex-none bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors"
                  onClick={handleSearchClick}
                >
                  Search
                </button>
                <button className="flex items-center justify-center bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                  <Navigation className="h-5 w-5" />
                  <span className="ml-2 hidden sm:inline">Near Me</span>
                </button>
              </div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold pt-16 text-white text-center mb-8">
            Now You can search & List Your PG For Free
          </h1>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="py-16 px-6 lg:px-12 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
            How <span className="text-gradient-primary">PG Finder</span> Works
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Finding your ideal PG accommodation is just four simple steps away. No hassle, no brokerage.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-pgfinder-light flex items-center justify-center mb-4">
                <Search size={24} className="text-pgfinder-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Search</h3>
              <p className="text-gray-600">Enter your preferred location and requirements</p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 rounded-full bg-pgfinder-light flex items-center justify-center mb-4">
                <FileText size={24} className="text-pgfinder-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compare</h3>
              <p className="text-gray-600">View verified listings with real photos and reviews</p>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 rounded-full bg-pgfinder-light flex items-center justify-center mb-4">
                <Check size={24} className="text-pgfinder-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Book</h3>
              <p className="text-gray-600">Schedule a visit or book directly through our platform</p>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="w-16 h-16 rounded-full bg-pgfinder-light flex items-center justify-center mb-4">
                <Home size={24} className="text-pgfinder-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Move-in</h3>
              <p className="text-gray-600">Enjoy your new home with our support throughout your stay</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Auto-scroll + Pause on Hover (NO DUPLICATES) */}
      <section className="py-16 px-6 lg:px-12 bg-pgfinder-light">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
            Features That Make Us <span className="text-gradient-primary">Different</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We've reimagined the PG hunting experience with features designed to make your search easier and more transparent.
          </p>

          <div className="relative">
            {/* Left arrow - mobile only */}
            <button
              type="button"
              onClick={() => scrollFeaturesByCard('left')}
              className="md:hidden absolute -left-12 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-card rounded-full p-2"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Right arrow - mobile only */}
            <button
              type="button"
              onClick={() => scrollFeaturesByCard('right')}
              className="md:hidden absolute -right-12 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-card rounded-full p-2"
            >
              <ChevronRight size={20} />
            </button>

            <div
              ref={featuresScrollRef}
              className="
                grid gap-8
                grid-flow-col auto-cols-[100%] overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2
                [-ms-overflow-style:none] [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
                md:grid-flow-row md:auto-cols-auto md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:snap-none md:pb-0
              "
            >
              {/* Feature 1 */}
              <div className="bg-white rounded-lg p-6 shadow-card hover:shadow-lg transition-all-300 animate-fade-in snap-center flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-pgfinder-light flex items-center justify-center mb-4">
                  <Heart size={24} className="text-pgfinder-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Recommendations</h3>
                <p className="text-gray-600">
                  Our smart algorithms analyze your preferences to suggest the perfect PG options tailored to your needs.
                </p>
              </div>

              {/* Feature 2 */}
              <div
                className="bg-white rounded-lg p-6 shadow-card hover:shadow-lg transition-all-300 animate-fade-in snap-center flex flex-col items-center text-center"
                style={{ animationDelay: '0.2s' }}
              >
                <div className="w-12 h-12 rounded-full bg-pgfinder-light flex items-center justify-center mb-4">
                  <Calendar size={24} className="text-pgfinder-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-time Availability</h3>
                <p className="text-gray-600">
                  Check real-time vacancy status and book instantly. No more wasted visits to already-filled accommodations.
                </p>
              </div>

              {/* Feature 3 */}
              <div
                className="bg-white rounded-lg p-6 shadow-card hover:shadow-lg transition-all-300 animate-fade-in snap-center flex flex-col items-center text-center"
                style={{ animationDelay: '0.4s' }}
              >
                <div className="w-12 h-12 rounded-full bg-pgfinder-light flex items-center justify-center mb-4">
                  <Home size={24} className="text-pgfinder-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Flexible Stay Options</h3>
                <p className="text-gray-600">
                  Find accommodations for short-term visits or long-term stays with flexible lease terms to match your needs.
                </p>
              </div>

              {/* Feature 4 */}
              <div
                className="bg-white rounded-lg p-6 shadow-card hover:shadow-lg transition-all-300 animate-fade-in snap-center flex flex-col items-center text-center"
                style={{ animationDelay: '0.6s' }}
              >
                <div className="w-12 h-12 rounded-full bg-pgfinder-light flex items-center justify-center mb-4">
                  <Shield size={24} className="text-pgfinder-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
                <p className="text-gray-600">
                  Every property on our platform is physically verified by our team to ensure listings match reality.
                </p>
              </div>

              {/* Feature 5 */}
              <div
                className="bg-white rounded-lg p-6 shadow-card hover:shadow-lg transition-all-300 animate-fade-in snap-center flex flex-col items-center text-center"
                style={{ animationDelay: '0.8s' }}
              >
                <div className="w-12 h-12 rounded-full bg-pgfinder-light flex items-center justify-center mb-4">
                  <Search size={24} className="text-pgfinder-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Advanced Filters</h3>
                <p className="text-gray-600">
                  Filter options by budget, amenities, food preferences, gender-specific options, and much more.
                </p>
              </div>

              {/* Feature 6 */}
              <div
                className="bg-white rounded-lg p-6 shadow-card hover:shadow-lg transition-all-300 animate-fade-in snap-center flex flex-col items-center text-center"
                style={{ animationDelay: '1s' }}
              >
                <div className="w-12 h-12 rounded-full bg-pgfinder-light flex items-center justify-center mb-4">
                  <MapPin size={24} className="text-pgfinder-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Virtual Tours</h3>
                <p className="text-gray-600">
                  Explore properties virtually with 360° tours and detailed photos before scheduling an in-person visit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PG Owners Section */}
      <section className="py-16 px-6 lg:px-12 bg-gradient-to-r from-pgfinder-primary to-pgfinder-secondary text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Are You a PG Owner?</h2>
              <p className="mb-6 text-white/90">
                List your property on PG Finder and reach thousands of potential tenants. No commission, transparent process, and dedicated support.
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-white" />
                  <span>Free listing with premium options available</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-white" />
                  <span>Verified tenant profiles for better security</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-white" />
                  <span>Manage bookings and payments through our platform</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-white" />
                  <span>Dedicated support team for property owners</span>
                </li>
              </ul>
              <button className="bg_WHITE text-pgfinder-primary hover:bg-pgfinder-light py-3 px-8 rounded-md font-medium transition-all-300 inline-flex items-center gap-2">
                List Your Property
                <ArrowRight size={18} />
              </button>
            </div>

            {/* phone call form  */}
            <div className="flex-1 flex justify-center">
              <div className="bg-white text-black p-6 rounded-lg w-full md:w-3/4 shadow-md">
                <h3 className="text-xl font-bold mb-4">Add your PG with a phone call</h3>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);

                    try {
                      const response = await fetch(`${import.meta.env.VITE_API_URL}/request-callback`, {
                        method: 'POST',
                        body: formData,
                      });

                      if (response.ok) {
                        alert('Callback request sent successfully!');
                        form.reset();
                      } else {
                        alert('Something went wrong, please try again.');
                      }
                    } catch (error) {
                      console.error(error);
                      alert('Something went wrong, please try again.');
                    }
                  }}
                >
                  <div className="mb-4">
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1 font-medium">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobile_number"
                      placeholder="Enter your number"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1 font-medium">When do you want a callback?</label>
                    <select
                      name="callback_within"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                      <option value="">Select time</option>
                      <option value="10min">Within 10 minutes</option>
                      <option value="1hr">Within 1 hour</option>
                      <option value="2hr">Within 2 hours</option>
                      <option value="custom">Later today</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-900 font-medium transition-all-300 inline-flex items-center gap-2"
                  >
                    Request Callback
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
