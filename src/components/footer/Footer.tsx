import React from "react";
import { MapPin, Mail, Phone, Youtube } from "lucide-react";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1A1F2C] text-white py-12 px-6 lg:px-12">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="relative">
            <h3 className="text-xl font-bold mb-4 text-center">PG Finder</h3>
            <div className="relative text-[#C8C8C9]">
              <p className="mb-4 text-center">
                Find your perfect PG accommodation without brokerage fees. Verified listings, transparent process.
              </p>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#1A1F2C]" />
            </div>
            <div className="mt-6 flex justify-center space-x-4 text-xl text-[#C8C8C9]">
              <a href="#"><FaInstagram className="hover:text-white" /></a>
              <a href="#"><FaLinkedin className="hover:text-white" /></a>
              <a href="#"><FaTwitter className="hover:text-white" /></a>
              <a href="#"><Youtube className="hover:text-white" size={22} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center">Quick Links</h3>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm md:text-base">
              {["About Us", "How It Works", "Our Services", "List Your Property", "Blog & Resources"].map(link => (
                <li key={link}>
                  <a href="#" className="text-[#C8C8C9] hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center">Popular Cities</h3>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm md:text-base">
              {["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata"].map(city => (
                <li key={city}>
                  <a href="#" className="text-[#C8C8C9] hover:text-white transition-colors">
                    {city}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center">Contact Us</h3>
            <div className="text-[#C8C8C9] text-sm space-y-4">
              <div className="flex items-start gap-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>123 Main Street, Koramangala, Bangalore - 560034</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <a href="mailto:support@pgfinder.com" className="hover:text-white">
                  support@pgfinder.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <a href="tel:+918012345678" className="hover:text-white">
                  +91 8012345678
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-[#403E43] flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-[#C8C8C9] mb-4 md:mb-0">
            © {new Date().getFullYear()} PG Finder. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="text-[#C8C8C9] hover:text-white">Privacy Policy</a>
            <a href="#" className="text-[#C8C8C9] hover:text-white">Terms of Service</a>
            <a href="#" className="text-[#C8C8C9] hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
