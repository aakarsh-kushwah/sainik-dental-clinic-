import React from 'react';
import { FaPhoneAlt, FaClock, FaAward } from 'react-icons/fa';
import './InfoBar.css';

const InfoBar = () => {
  return (
    <div className="info-wrapper">
      <div className="info-bar">
        
        {/* --- 1. OPENING HOURS --- */}
        <div className="info-item">
          <div className="icon-circle icon-blue">
            <FaClock />
          </div>
          <div className="info-text">
            <h3>Clinic Timings</h3>
            <p>
              <span className="time-slot">Morning: 10:00 - 3:00</span>
              <span className="time-sep">|</span>
              <span className="time-slot">Evening: 5:00 - 8:00</span>
            </p>
          </div>
        </div>

        {/* Divider Line (Desktop) */}
        <div className="info-divider"></div>

        {/* --- 2. LEGACY & LOCATION --- */}
        <div className="info-item">
          <div className="icon-circle icon-gold">
            <FaAward />
          </div>
          <div className="info-text">
            <h3>18+ Years of Trust</h3>
            <p>Serving Dewas District with Excellence</p>
          </div>
        </div>

        {/* Divider Line (Desktop) */}
        <div className="info-divider"></div>

        {/* --- 3. EMERGENCY CONTACT --- */}
        <div className="info-item">
          <div className="icon-circle icon-red">
            <FaPhoneAlt />
          </div>
          <div className="info-text">
            <h3>Emergency Support</h3>
            {/* Clickable Link for Mobile */}
            <a href="tel:+917879150705" className="phone-link">
              +91 78791 50705
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InfoBar;