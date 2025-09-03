// src/components/Footer.js

import React from 'react';
import './Footer.css';
// Import the icons from react-icons/fa
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo-section">
          <a href="#" className="logo">
            <span className="logo-icon">🌿</span> AyurInfo
          </a>
          <p className="copyright-text">&copy; 2024 Your Brand. All Rights Reserved.</p>
        </div>
        <div className="footer-links-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-socials-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            {/* Use the imported React components for each icon */}
            <a href="https://www.facebook.com/" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://www.twitter.com/" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://www.instagram.com/" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;