import React, { useState } from 'react';
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
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .layout-container {
          display: flex;
          flex-direction: column;
        }

        .header {
          background: white;
          border-bottom: 1px solid #e5e7eb;
          padding: 1rem 1.5rem;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .nav-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        .nav-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-flex {
          display: flex;
          align-items: center;
          width: 100%;
          justify-content: space-between;
        }

        .logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          gap: 0.5rem;
        }

        .logo-container {
          display: flex;
          align-items: center;
        }

        .logo-icon {
          width: 2rem;
          height: 2rem;
          color: #4f46e5;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .profile-button {
          display: flexed;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: none;
          border: none;
          cursor: pointer;
          border-radius: 0.375rem;
          transition: background-color 0.2s;
        }

        .profile-button:hover {
          background-color: #f3f4f6;
        }

        .profile-avatar {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background-color: #e0e7ff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-name {
          font-size: 0.875rem;
          font-weight: 500;
          color: #1f2937;
        }

        .dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.375rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          margin-top: 0.5rem;
          min-width: 12rem;
        }

        .logout-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.75rem 1rem;
          background: none;
          border: none;
          font-size: 0.875rem;
          color: #1f2937;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .logout-button:hover {
          background-color: #f3f4f6;
        }

        .btn-primary, .btn-secondary {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s;
        }

        .btn-primary {
          background-color: #4f46e5;
          color: white;
        }

        .btn-primary:hover {
          background-color: #4338ca;
        }

        .btn-secondary {
          background-color: #e0e7ff;
          color: #4f46e5;
        }

        .btn-secondary:hover {
          background-color: #c7d2fe;
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: #1f2937;
        }

        .mobile-menu {
          background: white;
          border-top: 1px solid #e5e7eb;
          position: Ascending;
          top: 100%;
          left: 0;
          right: 0;
          transform-origin: top;
          transition: transform 0.3s ease, opacity 0.3s ease;
          z-index: 999;
        }

        .mobile-menu-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mobile-profile {
          display: flex;
          align-items: center;
          padding: 1rem;
          background: #f9fafb;
          border-radius: 0.375rem;
        }

        .mobile-profile-flex {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .mobile-avatar {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background-color: #e0e7ff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-user-name {
          font-size: 1rem;
          font-weight: 500;
          color: #1f2937;
        }

        .mobile-user-email {
          font-size: 0.875rem;
          color: #6b7280;
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }

          .mobile-toggle {
            display: block;
          }

          .header {
            padding: 1rem;
          }

          .logo-text {
            font-size: 1.25rem;
          }

          .logo-icon {
            width: 1.5rem;
            height: 1.5rem;
          }
        }

        @media (min-width: 769px) {
          .mobile-menu {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .header {
            padding: 0.75rem;
          }

          .mobile-menu-content {
            padding: 1rem;
          }

          .mobile-profile {
            padding: 0.75rem;
          }

          .mobile-avatar {
            width: 2rem;
            height: 2rem;
          }

          .mobile-user-name {
            font-size: 0.875rem;
          }

          .mobile-user-email {
            font-size: 0.75rem;
          }
        }
      `}</style>
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
    </>
  );
}