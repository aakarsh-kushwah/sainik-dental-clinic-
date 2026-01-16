import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaMapMarkerAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ onServicesClick }) => {
  const [click, setClick] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const logoUrl = "https://i.ibb.co/j90q7gPd/Gemini-Generated-Image-2mjbf52mjbf52mjb-removebg-preview.png";

  // Toggle Mobile Menu
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Services Click - Opens popup
  const handleServicesClick = (e) => {
    e.preventDefault();
    closeMobileMenu();
    if (onServicesClick) {
      onServicesClick();
    }
  };

  // Scroll to Footer (About Us)
  const scrollToFooter = (e) => {
    e.preventDefault();
    closeMobileMenu();
    const footer = document.getElementById('footer-section');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to Booking/Contact
  const scrollToBooking = (e) => {
    e.preventDefault();
    closeMobileMenu();
    const booking = document.getElementById('booking-section');
    if (booking) {
      booking.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to Home (top)
  const scrollToHome = () => {
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={scrolled ? "navbar active" : "navbar"}>
      <div className="navbar-container">
        
        {/* Logo */}
        <div className="logo" onClick={scrollToHome}>
          <img src={logoUrl} alt="DentCare Logo" className="logo-img" />
          <span className="logo-text">Sainik Dental <span className="highlight">Clinic</span></span>
        </div>

        {/* Mobile Menu Icon */}
        <div className="menu-icon" onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation Links */}
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          
          {/* Services - Opens popup */}
          <li className="nav-item">
            <a href="#services" className="nav-links" onClick={handleServicesClick}>
              Services
            </a>
          </li>

          {/* About Us */}
          <li className="nav-item">
            <a href="#footer" className="nav-links" onClick={scrollToFooter}>
              About Us
            </a>
          </li>

          {/* Location */}
          <li className="nav-item location-item">
            <a href="#booking" className="nav-links location-link" onClick={scrollToBooking}>
              <FaMapMarkerAlt className="location-icon" />
              <span>Location</span>
            </a>
          </li>

          {/* CTA Button */}
          <li className="nav-item-btn">
            <a href="#booking" className="btn-nav" onClick={scrollToBooking}>
              Book Appointment
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;