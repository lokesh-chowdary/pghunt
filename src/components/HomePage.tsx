import React, { useState } from 'react';
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
  Star, 
  Check, 
  Home, 
  FileText, 
  Shield, 
  Heart 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function HomePage() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [propertyType, setPropertyType] = useState('Gents');
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/home'); // Assuming '/' is your home route
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
                <button className="flex-1 sm:flex-none bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors"
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
              <div className="mt-4 hidden md:block">
                <ArrowRight className="transform rotate-90 md:rotate-0 text-pgfinder-primary" />
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 rounded-full bg-pgfinder-light flex items-center justify-center mb-4">
                <FileText size={24} className="text-pgfinder-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compare</h3>
              <p className="text-gray-600">View verified listings with real photos and reviews</p>
              <div className="mt-4 hidden md:block">
                <ArrowRight className="transform rotate-90 md:rotate-0 text-pgfinder-primary" />
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="w-16 h-16 rounded-full bg-pgfinder-light flex items-center justify-center mb-4">
                <Check size={24} className="text-pgfinder-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Book</h3>
              <p className="text-gray-600">Schedule a visit or book directly through our platform</p>
              <div className="mt-4 hidden md:block">
                <ArrowRight className="transform rotate-90 md:rotate-0 text-pgfinder-primary" />
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="w-16 h-16 rounded-full bg-pgfinder-light flex items-center justify-center mb-4">
                <Home size={24} className="text-pgfinder-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Move-in</h3>
              <p className="text-gray-600">Enjoy your new home with our support throughout your stay</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 lg:px-12 bg-pgfinder-light">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
            Features That Make Us <span className="text-gradient-primary">Different</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We've reimagined the PG hunting experience with features designed to make your search easier and more transparent.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-6 shadow-card hover:shadow-lg transition-all-300 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-pgfinder-light flex items-center justify-center mb-4">
                <Heart size={24} className="text-pgfinder-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Recommendations</h3>
              <p className="text-gray-600">
                Our smart algorithms analyze your preferences to suggest the perfect PG options tailored to your needs.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-6 shadow-card hover:shadow-lg transition-all-300 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-12 h-12 rounded-full bg-pgfinder-light flex items-center justify-center mb-4">
                <Calendar size={24} className="text-pgfinder-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Availability</h3>
              <p className="text-gray-600">
                Check real-time vacancy status and book instantly. No more wasted visits to already-filled accommodations.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-6 shadow-card hover:shadow-lg transition-all-300 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="w-12 h-12 rounded-full bg-pgfinder-light flex items-center justify-center mb-4">
                <Home size={24} className="text-pgfinder-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Stay Options</h3>
              <p className="text-gray-600">
                Find accommodations for short-term visits or long-term stays with flexible lease terms to match your needs.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white rounded-lg p-6 shadow-card hover:shadow-lg transition-all-300 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="w-12 h-12 rounded-full bg-pgfinder-light flex items-center justify-center mb-4">
                <Shield size={24} className="text-pgfinder-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
              <p className="text-gray-600">
                Every property on our platform is physically verified by our team to ensure listings match reality.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white rounded-lg p-6 shadow-card hover:shadow-lg transition-all-300 animate-fade-in" style={{ animationDelay: "0.8s" }}>
              <div className="w-12 h-12 rounded-full bg-pgfinder-light flex items-center justify-center mb-4">
                <Search size={24} className="text-pgfinder-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Filters</h3>
              <p className="text-gray-600">
                Filter options by budget, amenities, food preferences, gender-specific options, and much more.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white rounded-lg p-6 shadow-card hover:shadow-lg transition-all-300 animate-fade-in" style={{ animationDelay: "1s" }}>
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
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 lg:px-12 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
            What Our <span className="text-gradient-primary">Users Say</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Thousands of students and professionals have found their ideal PG accommodations through our platform.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-card hover:shadow-lg transition-all-300 animate-slide-in">
              <div className="flex items-center mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/28.jpg" 
                  alt="Priya Sharma"
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold">Priya Sharma</h4>
                  <p className="text-sm text-gray-500">Student, Delhi University</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">
                "I was struggling to find a decent PG close to my college until I found PG Finder. The verified listings saved me from visiting fake properties, and I found my current PG within just 2 days!"
              </p>
              
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-current text-yellow-400" />
                <Star className="h-5 w-5 fill-current text-yellow-400" />
                <Star className="h-5 w-5 fill-current text-yellow-400" />
                <Star className="h-5 w-5 fill-current text-yellow-400" />
                <Star className="h-5 w-5 fill-current text-yellow-400" />
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-card hover:shadow-lg transition-all-300 animate-slide-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Rahul Verma"
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold">Rahul Verma</h4>
                  <p className="text-sm text-gray-500">Software Engineer, Bangalore</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">
                "As someone new to Bangalore, finding accommodation was a major concern. PG Finder's filters helped me locate a PG that offers home-cooked meals and is walking distance from my office."
              </p>
              
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-current text-yellow-400" />
                <Star className="h-5 w-5 fill-current text-yellow-400" />
                <Star className="h-5 w-5 fill-current text-yellow-400" />
                <Star className="h-5 w-5 fill-current text-yellow-400" />
                <Star className="h-5 w-5 text-gray-300" />
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-card hover:shadow-lg transition-all-300 animate-slide-in" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/54.jpg" 
                  alt="Sneha Patel"
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold">Sneha Patel</h4>
                  <p className="text-sm text-gray-500">Healthcare Professional, Mumbai</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">
                "The virtual tours feature saved me so much time. I could shortlist PGs from another city before my move to Mumbai. The place I selected was exactly as shown in the photos!"
              </p>
              
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-current text-yellow-400" />
                <Star className="h-5 w-5 fill-current text-yellow-400" />
                <Star className="h-5 w-5 fill-current text-yellow-400" />
                <Star className="h-5 w-5 fill-current text-yellow-400" />
                <Star className="h-5 w-5 fill-current text-yellow-400" />
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
              <button className="bg-white text-pgfinder-primary hover:bg-pgfinder-light py-3 px-8 rounded-md font-medium transition-all-300 inline-flex items-center gap-2">
                List Your Property
                <ArrowRight size={18} />
              </button>
            </div>
            <div className="flex-1 md:flex justify-center hidden">
              <img 
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=1000" 
                alt="PG interior" 
                className="rounded-lg shadow-lg max-w-md w-full object-cover h-80"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Big CTA Section */}
      <section className="py-16 px-6 lg:px-12 bg-white text-center">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Find Your Perfect PG?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied users who found their ideal PG accommodation without any brokerage fees.
          </p>
          <button className="bg-gradient-primary hover:opacity-90 text-white text-lg py-4 px-10 rounded-md font-medium transition-all-300 inline-flex items-center gap-2">
            Start Finding Your PG Now
            <ArrowRight size={20} />
          </button>
        </div>
      </section>


      
      
      

     
    </div>
  );
}

export default HomePage;