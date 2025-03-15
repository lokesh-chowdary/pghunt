import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Building2, 
  ChevronDown, 
  Phone, 
  MessageSquare, 
  Menu, 
  Navigation, 
  Users, 
  Bed, 
  Building2 as PG,
  Clock as QuickStay,
  Wrench,
  Home as HomeService,
  Key,
  ClipboardCheck,
  X,
  UserCircle2 as Male,
  UserCircle as Female,
  Users2 as CoLive 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function HomePage() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [propertyType, setPropertyType] = useState('Gents');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const stats = [
    { icon: <PG className="h-12 w-12" />, count: '100+', label: 'PGs' },
    { icon: <Bed className="h-12 w-12" />, count: '1000+', label: 'Beds' },
    { icon: <Users className="h-12 w-12" />, count: '2000+', label: 'Users' }
  ];
  
  const services = [
    { icon: <HomeService className="h-8 w-8" />, title: 'Home Services', desc: 'Painting, Cleaning & More' },
    { icon: <Key className="h-8 w-8" />, title: 'Rental Agreement', desc: 'Rental agreement with digital signature' },
    { icon: <Wrench className="h-8 w-8" />, title: 'Packers & Movers', desc: 'Verified moving partners' },
    { icon: <ClipboardCheck className="h-8 w-8" />, title: 'Property Legal Services', desc: 'Documentation & advisory' },
  ];

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedArea(''); // Reset area when city changes
  };

  return (
    <div className="min-h-screen bg-gray-50">
     

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
         
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
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

      {/* About Section */}
      <div className="container mx-auto px-4 pt-32 py-16 sm:pt-5">
        <h2 className="text-3xl font-bold text-center mt-8 mb-12">About Us</h2>
        <div className="grid sm:grid-cols-2  md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Users className="h-12 w-12 mx-auto text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">100+</h3>
            <p className="text-gray-600">Users.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Bed className="h-12 w-12 mx-auto text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">1000+</h3>
            <p className="text-gray-600">Beds.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Building2 className="h-12 w-12 mx-auto text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">2000+</h3>
            <p className="text-gray-600">PG's.</p>
          </div>
        </div>
      </div>

      
      {/* Features Section */}
      <div className="container mx-auto px-4 ">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Finder?</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Phone className="h-12 w-12 mx-auto text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Direct Contact With Owners</h3>
            <p className="text-gray-600">Don't pay any brokerage. Deal directly with owners.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <MessageSquare className="h-12 w-12 mx-auto text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
            <p className="text-gray-600">All our listings are physically verified.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Building2 className="h-12 w-12 mx-auto text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Digital Rental Agreement</h3>
            <p className="text-gray-600">Create rental agreement online with digital signatures.</p>
          </div>
        </div>
      </div>

      {/* Services Section
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-red-500 mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
 */}

     
    </div>
  );
}

export default HomePage;