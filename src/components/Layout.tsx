import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Building2, LogIn, Plus } from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <Building2 className="h-8 w-8 text-indigo-600 group-hover:scale-110 transition-transform duration-200" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 
                bg-clip-text text-transparent">
                PG Hunt
              </h1>
            </Link>
            {!isAuthPage && (
              <div className="flex items-center gap-4">
                <Link to="/login" className="btn-secondary flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link to="/register" className="btn-primary flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  List Your PG
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  );
}