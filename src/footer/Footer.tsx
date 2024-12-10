import React from "react";
import "./Footer.css";

// Import icons (update paths)
import facebookIcon from "./logos/facebook.png";
import instagramIcon from "./logos/instagram.png";
import twitterIcon from "./logos/twitter.png";
import linkedinIcon from "./logos/linkedIn.png";

const App = () => {
  return (
    <div className="App">
      {/* Footer Section */}
      <footer>
        <div className="footer-container">
          {/* About Us Section */}
          <div className="footer-section">
            <h3>About Us</h3>
            <p>
              PG-HUNT is your trusted platform for finding the best PG
              accommodation options nearby. Whether you're a student or a
              working professional, we make your search easier.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/">Profile</a></li>
              <li><a href="/search-pgs">Search PG</a></li>
              <li><a href="/faqs">FAQs</a></li>
              <li><a href="/list Your PG">List Your PG</a></li>
              
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>
              Email: <a href="mailto:support@pghunt.com">support@pghunt.com</a>
            </p>
            <p>Phone: +91 123-456-7890</p>
            <p>Address: PG-HUNT, XYZ Street, City, State, Zip Code</p>
          </div>

          {/* Social Media Section */}
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebookIcon} alt="Facebook" className="social-logo" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagramIcon} alt="Instagram" className="social-logo" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={twitterIcon} alt="Twitter" className="social-logo" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={linkedinIcon} alt="LinkedIn" className="social-logo" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2024 PG-HUNT. All rights reserved. | Designed by [Your Company
            Name]
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
