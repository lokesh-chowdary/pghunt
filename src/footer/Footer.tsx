import React from "react";
import "./Footer.css";


const App = () => {
  return (
    <div className="App">
      {/* Footer Section */}
      <footer className="bg-gray-900 text-gray-300 mt-8">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-4">COMPANY</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">PROPERTY</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Gents PG</a></li>
                <li><a href="#" className="hover:text-white">Ladies PG</a></li>
                <li><a href="#" className="hover:text-white">Co-living</a></li>
                <li><a href="#" className="hover:text-white">Premium PGs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">SERVICES</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Rental Agreement</a></li>
                <li><a href="#" className="hover:text-white">Packers & Movers</a></li>
                <li><a href="#" className="hover:text-white">Home Services</a></li>
                <li><a href="#" className="hover:text-white">Legal Services</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">CONNECT WITH US</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">support@pgfinder.in</a></li>
                <li><a href="#" className="hover:text-white">1800-XXX-XXXX</a></li>
                <li><a href="#" className="hover:text-white">Monday - Saturday</a></li>
                <li><a href="#" className="hover:text-white">9:00 AM - 8:00 PM</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>&copy; 2024 PG Finder Technologies Solution Pvt Ltd. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
