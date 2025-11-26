import { MapPin, Mail, Phone, Youtube } from "lucide-react";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#1A1F2C] via-[#23283A] to-[#181C27] text-white py-12 px-4 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-extrabold mb-3 tracking-tight">PG Finder</h3>
            <p className="mb-4 text-center text-[#C8C8C9] text-base max-w-xs">
              Find your perfect PG accommodation without brokerage fees. Verified listings, transparent process.
            </p>
            <div className="flex justify-center space-x-4 text-2xl text-[#C8C8C9] mt-2">
              <a href="#" aria-label="Instagram" className="hover:text-pink-400 transition-colors">
                <FaInstagram />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-blue-400 transition-colors">
                <FaLinkedin />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-sky-400 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-red-500 transition-colors">
                <Youtube size={22} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-2 text-base w-full items-center">
              {[
                { name: "About Us", href: "#" },
                { name: "How It Works", href: "#" },
                { name: "Our Services", href: "#" },
                { name: "List Your Property", href: "#" },
                { name: "Blog & Resources", href: "#" },
              ].map(link => (
                <li key={link.name} className="w-full">
                  <a
                    href={link.href}
                    className="block text-[#C8C8C9] hover:text-white transition-colors px-2 py-1 rounded hover:bg-[#23283A] w-full text-center"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Cities */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Popular Cities</h3>
            <ul className="flex flex-wrap justify-center gap-2 text-base">
              {["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata"].map(city => (
                <li key={city}>
                  <a
                    href="#"
                    className="text-[#C8C8C9] hover:text-white transition-colors px-2 py-1 rounded hover:bg-[#23283A]"
                  >
                    {city}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="text-[#C8C8C9] text-base space-y-4 w-full max-w-xs">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 flex-shrink-0 text-[#6C63FF]" />
                <span>123 Main Street, Koramangala, Bangalore - 560034</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-[#6C63FF]" />
                <a href="mailto:support@pgfinder.com" className="hover:text-white transition-colors">
                  support@pgfinder.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-[#6C63FF]" />
                <a href="tel:+918012345678" className="hover:text-white transition-colors">
                  +91 8012345678
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-[#403E43] flex flex-col md:flex-row justify-between items-center text-sm gap-4">
          <p className="text-[#C8C8C9] text-center">
            © {new Date().getFullYear()} <span className="font-semibold text-white">PG Finder</span>. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#" className="text-[#C8C8C9] hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-[#C8C8C9] hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-[#C8C8C9] hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
