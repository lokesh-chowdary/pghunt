import { useState } from 'react';
import { Facebook, FacebookIcon, Instagram, Twitter } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 p-4 md:p-12 lg:p-16">
      <div className="container mx-auto flex flex-wrap justify-center md:justify-between md:flex-row gap-4 md:gap-8">
        <div className="flex justify-center w-full md:w-1/4 xl:w-1/5">
          <div className="text-center md:text-left">
            <h5 className="uppercase text-lg font-bold mb-4">About Us</h5>
            <p className="text-sm mb-4">Find comfortable and affordable PG accommodations with verified listings, amenities, and real photos in your preferred location.</p>
          </div>
        </div>
        <div className="flex justify-center w-full md:w-1/4 xl:w-1/5">
          <div className="text-center md:text-left">
            <h5 className="uppercase text-lg font-bold mb-4">Quick Links</h5>
            <ul className="flex flex-wrap justify-center md:justify-start md:flex-col sm:flex-row gap-2 sm:gap-4 md:gap-0">
              <li className="text-sm mb-2"><a href="/" className="hover:text-gray-100">Home</a></li>
              <li className="text-sm mb-2"><a href="#" className="hover:text-gray-100">About</a></li>
              <li className="text-sm mb-2"><a href="#" className="hover:text-gray-100">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center w-full md:w-1/4 xl:w-1/5">
          <div className="text-center md:text-left">
            <h5 className="uppercase text-lg font-bold mb-4">Contact Us</h5>
            <p className="text-sm mb-2">Email: <a href="#" className="hover:text-gray-100">info@example.com</a></p>
            <p className="text-sm mb-2">Phone: <a href="#" className="hover:text-gray-100">+1 123 456 7890</a></p>
            <p className="text-sm mb-2">Address: <a href="#" className="hover:text-gray-100">123 Main St, Anytown, USA</a></p>
          </div>
        </div>
        <div className="flex justify-center w-full md:w-1/4 xl:w-1/5">
          <div className="text-center md:text-left">
            <h5 className="uppercase text-lg font-bold mb-4">Follow Us</h5>
            <div className="flex items-center justify-center md:justify-start">
              <a href="#" className="mr-4 hover:text-gray-100">
                <div className="bg-white-200 border-2 border-dashed rounded-xl w-8 h-8 flex items-center justify-center">
                <div className=" lg:flex items-center gap-2">
                <Facebook className="w-6 h-6" />
                </div>
                </div>
              </a>
              <a href="#" className="mr-4 hover:text-gray-100">
                <div className="bg-white-200 border-2 border-dashed rounded-xl w-8 h-8 flex items-center justify-center">
                <div className=" lg:flex items-center gap-2">
                <Twitter className="w-6 h-6" />
                </div>
                </div>
              </a>
              <a href="#" className="mr-4 hover:text-gray-100">
                <div className="bg-white-200 border-2 border-dashed rounded-xl w-8 h-8 flex items-center justify-center">
                <div className=" lg:flex items-center gap-2">
                <Instagram className="w-6 h-6" />
                </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-2">
        <p className="text-sm">&copy; 2023 All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;