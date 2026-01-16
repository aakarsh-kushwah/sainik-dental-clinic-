import React from 'react';
import { 
  FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, 
  FaMapMarkerAlt, FaClock,
  FaTooth, FaHeart
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const contactInfo = [
    { 
      icon: <FaMapMarkerAlt />, 
      text: "near POOJA COLOUR LAB, Moti Bangla, Shivaji Nagar, Moti Bunglow, Dewas, Madhya Pradesh 455001" 
    },
    { 
      icon: <FaClock />, 
      text: "Mon-Sat: 10AM - 8PM | Sun: Emergency Only" 
    }
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, name: "Facebook", color: "#1877F2", link: "#" },
    { icon: <FaInstagram />, name: "Instagram", color: "#E4405F", link: "#" },
    { icon: <FaTwitter />, name: "Twitter", color: "#1DA1F2", link: "#" },
    { icon: <FaLinkedinIn />, name: "LinkedIn", color: "#0A66C2", link: "#" }
  ];

  return (
    <footer className="footer-section" id="footer-section">
      
      <div className="footer-container" style={{ justifyContent: 'space-around' }}>
        
        {/* Column 1: Brand & Identity */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <div className="logo-icon">
              <FaTooth />
            </div>
            <div className="logo-text">
              <h2>Sainik <span className="highlight">Dental</span> Clinic</h2>
              <p className="tagline">Creating Smiles, Building Confidence</p>
            </div>
          </div>
          
          <p className="footer-about">
            Beside CANARA BANK - DEWAS. <br />
            With <strong>18+ years</strong> of excellence, providing world-class dental care.
          </p>
        </div>

        {/* Column 2: Address & Social (Centered Focus) */}
        <div className="footer-col contact-col">
          <h3 className="section-title">Location & Hours</h3>
          
          <ul className="contact-list">
            {contactInfo.map((item, index) => (
              <li key={index} className="contact-item">
                <div className="contact-icon">{item.icon}</div>
                <div className="contact-details">
                  <span>{item.text}</span>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="social-section">
            <div className="social-icons">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.link}
                  className="social-icon"
                  style={{ '--social-color': social.color }}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="bottom-content">
          <p>&copy; {new Date().getFullYear()} Sainik Dental Clinic. All Rights Reserved.</p>
          <div className="credit">
            Made with <FaHeart className="heart" /> in India
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;