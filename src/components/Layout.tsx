import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Building2, LogIn, Plus, Menu, X, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';
import '../styles/global.css';

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
    <div className="layout-container">
      <header className="header">
        <div className="nav-container">
          <nav className="nav-content">
            <div className="nav-flex">
              <Link to="/" className="logo-link">
                <div className="logo-container">
                  <Building2 className="logo-icon" />
                </div>
                <h1 className="logo-text">PG Hunt</h1>
              </Link>

              {!isAuthPage && (
                <div className="desktop-nav">
                  {isAuthenticated ? (
                    <div className="relative">
                      <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="profile-button"
                      >
                        <div className="profile-avatar">
                          <User className="w-5 h-5 text-indigo-600" />
                        </div>
                        <span className="profile-name">{user?.name}</span>
                      </button>

                      {isProfileOpen && (
                        <div className="dropdown">
                          <button onClick={handleLogout} className="logout-button">
                            <LogOut className="w-4 h-4" />
                            Sign out
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link to="/login" className="btn-secondary">
                      <LogIn className="w-4 h-4" />
                      Login
                    </Link>
                  )}

                  {isAuthenticated && (
                    <Link to="/list-your-pg" className="btn-primary">
                      <Plus className="w-4 h-4" />
                      List Your PG
                    </Link>
                  )}
                </div>
              )}

              {!isAuthPage && (
                <button
                  className="mobile-toggle"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              )}
            </div>

            {!isAuthPage && (
              <div 
                className="mobile-menu"
                style={{
                  transform: isMenuOpen ? 'scaleY(1)' : 'scaleY(0)',
                  opacity: isMenuOpen ? 1 : 0
                }}
              >
                <div className="mobile-menu-content">
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
                        className="btn-primary"
                        style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
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
                        className="btn-secondary"
                        style={{ width: '100%', justifyContent: 'center', padding: '10px', marginTop: '8px' }}
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="btn-secondary"
                      style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LogIn className="w-4 h-4" />
                      Login
                    </Link>
                  )}
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  );
}