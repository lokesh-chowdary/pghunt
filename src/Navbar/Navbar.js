import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [navActive, setNavActive] = useState(false);

  useEffect(() => {
    const getMode = localStorage.getItem("mode");
    if (getMode && getMode === "dark-mode") {
      setDarkMode(true);
    }
  }, []);

  const handleModeToggle = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("mode", darkMode ? "light-mode" : "dark-mode");
  };

  const handleSearchToggle = () => {
    setSearchActive(!searchActive);
  };

  const handleSidebarToggle = () => {
    setNavActive(!navActive);
  };

  return (
    <div className={`body ${darkMode ? 'dark' : ''}`}>
      <nav className={`${navActive ? 'active' : ''}`}>
        <div className="nav-bar">
          <i className='bx bx-menu sidebarOpen' onClick={handleSidebarToggle}></i>
          <span className="logo navLogo"><a href="#">PG Hunt</a></span>

          <div className={`menu ${navActive ? 'active' : ''}`}>
            <div className="logo-toggle">
              <span className="logo"><a href="#">PG Hunt</a></span>
              <i className='bx bx-x siderbarClose' onClick={handleSidebarToggle}></i>
            </div>

            <ul className="nav-links">
              <li><a href="#">Account</a></li>
              <li><a href="#">New PG-Register</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">About</a></li>
            </ul>
          </div>

          <div className="darkLight-searchBox">
            <div className="dark-light" onClick={handleModeToggle}>
              <i className={`bx ${darkMode ? 'bx-sun' : 'bx-moon'} moon`}></i>
            </div>

            <div className="searchBox">
              <div className={`searchToggle ${searchActive ? 'active' : ''}`} onClick={handleSearchToggle}>
                <i className='bx bx-search search'></i>
                <i className='bx bx-x cancel'></i>
              </div>

              <div className={`search-field ${searchActive ? 'active' : ''}`}>
                <input type="text" placeholder="Search..." />
                <i className='bx bx-search'></i>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;