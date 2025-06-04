import  { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Building2, LogIn, Plus, Menu, X, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);

  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out');
    navigate('/');
  };

  return (
    <>
      <div className="">
        <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="relative">
          <div className="flex items-center justify-between gap-4">
            {/* Logo - Always visible */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0 py-1">
          <div className="bg-white shadow-md rounded-xl p-1.5 group-hover:shadow-lg transition-shadow duration-200">
            <Building2 className="h-6 w-6 sm:h-7 sm:w-7 text-indigo-600 group-hover:scale-110 transition-transform duration-200" />
          </div>
          <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
            PG Finder
          </h1>
            </Link>

            {/* Desktop navigation */}
            {!isAuthPage && (
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated && (
              <Link to="/list-your-pg" className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            List Your PG
              </Link>
            )}

            {isAuthenticated ? (
              <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <User className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="font-medium">{user?.name}</span>
            </button>

            {isProfileOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 border border-gray-100 animate-fade-in">
                <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
              <LogOut className="w-4 h-4" />
              Sign out
                </button>
              </div>
            )}
              </div>
            ) : (
              <Link to="/login" className="btn-secondary flex items-center gap-2">
            <LogIn className="w-4 h-4" />
            Login
              </Link>
            )}
          </div>
            )}

            {/* Mobile buttons */}
            <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
            </div>
          </div>

          {/* Mobile navigation dropdown */}
          {!isAuthPage && (
            <div
          className={`lg:hidden absolute right-0 left-0 top-full mt-2 transform transition-all duration-300 ease-in-out origin-top ${
            isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
          }`}
            >
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-3">
              {isAuthenticated ? (
            <>
              <div className="mobile-profile">
                <div className="mobile-profile-flex">
              <div className="mobile-avatar">
                <User className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="mobile-user-name">{user?.name}</p>
                <p className="mobile-user-email">{user?.email}</p>
              </div>
                </div>
              </div>
              <Link
                to="/list-your-pg"
                className="btn-primary w-full flex items-center justify-center gap-2 py-2.5"
                onClick={() => setIsMenuOpen(false)}
              >
                <Plus className="w-4 h-4" />
                List Your PG
              </Link>
              <button
                onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
                }}
                className="w-full btn-secondary flex items-center justify-center gap-2 py-2.5 mt-2"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </>
              ) : (
            <Link
              to="/login"
              className="btn-secondary w-full flex items-center justify-center gap-2 py-2.5"
              onClick={() => setIsMenuOpen(false)}
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
              )}
            </div>
          </div>
            </div>
          )}
        </nav>
          </div>
        </header>

        <Outlet />
      </div>
    </>
  );
}
