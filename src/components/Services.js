import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  FaTooth, FaSmile, FaCrown, FaAlignCenter, 
  FaTeeth, FaTeethOpen, FaMagic, FaShieldAlt, FaStar, 
  FaArrowRight, FaPaintBrush, FaDesktop,
  FaRobot, FaXRay
} from 'react-icons/fa';
import './Services.css';

const Services = ({ isPopup = false, onBookNow }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedService, setSelectedService] = useState(null);

  // Scroll to top when popup opens
  useEffect(() => {
    if (isPopup) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isPopup]);

  // Static Data (Moved inside useMemo would be overkill, but keeping clean)
  const serviceCategories = [
    { id: 'all', name: 'All Services', icon: <FaStar />, color: '#2563eb' },
    { id: 'general', name: 'General Dentistry', icon: <FaTooth />, color: '#059669' },
    { id: 'cosmetic', name: 'Cosmetic', icon: <FaSmile />, color: '#ec4899' },
    { id: 'implant', name: 'Implants', icon: <FaCrown />, color: '#f59e0b' },
    { id: 'ortho', name: 'Orthodontics', icon: <FaAlignCenter />, color: '#8b5cf6' },
    { id: 'digital', name: 'Digital', icon: <FaDesktop />, color: '#06b6d4' },
  ];

  const allServices = [
    {
      id: 1,
      title: "Root Canal Treatment",
      description: "Painless root canal therapy using advanced rotary endodontics.",
      icon: <FaTooth />,
      category: 'general',
      details: "Advanced root canal treatment to save infected teeth with minimal discomfort."
    },
    {
      id: 2,
      title: "Laser Filling",
      description: "Painless cavity treatment with laser technology.",
      icon: <FaMagic />,
      category: 'general',
      details: "Modern laser technology for cavity treatment without traditional drilling."
    },
    {
      id: 3,
      title: "Wisdom Tooth Extraction",
      description: "Safe removal of impacted wisdom teeth with minimal discomfort.",
      icon: <FaTeethOpen />,
      category: 'general',
      details: "Expert surgical extraction of wisdom teeth when needed."
    },
    {
      id: 4,
      title: "Complete Denture",
      description: "Full mouth restoration with custom-made removable dentures.",
      icon: <FaTeeth />,
      category: 'general',
      details: "Complete oral rehabilitation with custom dentures."
    },
    {
      id: 5,
      title: "Implant Denture",
      description: "Fixed implant-supported dentures for superior stability.",
      icon: <FaShieldAlt />,
      category: 'implant',
      details: "Combines implant strength with denture convenience for best results."
    },
    {
      id: 6,
      title: "Orthodontic Treatment",
      description: "Teeth alignment for perfect smile and bite correction.",
      icon: <FaAlignCenter />,
      category: 'ortho',
      details: "Professional teeth straightening for better function and aesthetics."
    },
    {
      id: 7,
      title: "Clear Aligners",
      description: "Invisible aligner treatment for discreet teeth straightening.",
      icon: <FaXRay />,
      category: 'ortho',
      details: "Modern alternative to traditional braces - nearly invisible treatment."
    },
    {
      id: 8,
      title: "Zirconia Crown",
      description: "Strong and aesthetic metal-free crowns.",
      icon: <FaCrown />,
      category: 'cosmetic',
      details: "Durable and aesthetic crown solution that blends perfectly."
    },
    {
      id: 9,
      title: "E-Max Crown",
      description: "Premium ceramic crowns for superior aesthetics.",
      icon: <FaCrown />,
      category: 'cosmetic',
      details: "High-end ceramic crowns for the most natural-looking results."
    },
    {
      id: 10,
      title: "Digital Dentistry",
      description: "Advanced digital technology for precise dental work.",
      icon: <FaDesktop />,
      category: 'digital',
      details: "Cutting-edge digital technology for accurate dental procedures."
    },
    {
      id: 11,
      title: "Dental Implants",
      description: "Permanent tooth replacement solution.",
      icon: <FaCrown />,
      category: 'implant',
      details: "Best long-term solution for missing teeth that functions naturally."
    },
    {
      id: 12,
      title: "Dental Veneers",
      description: "Thin porcelain shells for perfect smile transformation.",
      icon: <FaPaintBrush />,
      category: 'cosmetic',
      details: "Fix chips, gaps, and discoloration with custom-made veneers."
    },
    {
      id: 13,
      title: "CAD/CAM Dentistry",
      description: "Computer-aided design and manufacturing for dental restorations.",
      icon: <FaRobot />,
      category: 'digital',
      details: "Same-day crowns and restorations using advanced CAD/CAM technology."
    }
  ];

  // --- PERFORMANCE OPTIMIZATION (useMemo) ---
  // Ye list tabhi dobara banegi jab category change hogi. (No Lag)
  const filteredServices = useMemo(() => {
    return activeCategory === 'all'
      ? allServices
      : allServices.filter(service => service.category === activeCategory);
  }, [activeCategory]);

  // --- SMART SCROLL LOGIC ---
  const scrollToBookingSection = useCallback(() => {
    const bookingSection = document.getElementById('booking-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // UX Highlight
      bookingSection.style.transition = 'transform 0.3s ease';
      bookingSection.style.transform = 'scale(1.02)';
      setTimeout(() => {
        bookingSection.style.transform = 'scale(1)';
      }, 500);
    }
  }, []);

  // --- HANDLERS (Clean & Secure) ---
  const handleBookAction = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Close modal first
    setSelectedService(null);

    // Call prop function if available (Popup mode)
    if (onBookNow) {
      onBookNow();
    } else {
      scrollToBookingSection();
    }
  }, [onBookNow, scrollToBookingSection]);

  return (
    <section className={`services-section ${isPopup ? 'popup-view' : ''}`} id={isPopup ? undefined : "services-section"}>
      <div className="services-container">
        
        {/* Header */}
        <div className="services-header">
          <div className="services-badge">
            <FaTooth className="badge-icon" /> Our Services
          </div>
          {/* CATEGORY FILTER BUTTONS (Mobile Scrollable) */}
          <div className="category-filters-scroll" style={{display: 'flex', gap: '10px', overflowX: 'auto', padding: '10px 0', marginTop: '10px'}}>
             {serviceCategories.map((cat) => (
               <button 
                 key={cat.id}
                 onClick={() => setActiveCategory(cat.id)}
                 className={`filter-chip ${activeCategory === cat.id ? 'active' : ''}`}
                 style={{
                   background: activeCategory === cat.id ? cat.color : '#f3f4f6',
                   color: activeCategory === cat.id ? 'white' : '#4b5563',
                   border: 'none',
                   padding: '8px 16px',
                   borderRadius: '20px',
                   cursor: 'pointer',
                   fontWeight: '600',
                   fontSize: '0.9rem',
                   whiteSpace: 'nowrap',
                   transition: 'all 0.3s ease'
                 }}
               >
                 {cat.name}
               </button>
             ))}
          </div>
        </div>
        
        {/* Services Grid */}
        <div className="services-grid">
          {filteredServices.map((service) => (
            <div key={service.id} className="service-card" style={{ '--card-color': serviceCategories.find(c => c.id === service.category)?.color }}>
              <div className="service-card-header">
                <div className="service-icon" style={{ backgroundColor: `${serviceCategories.find(c => c.id === service.category)?.color}15` }}>
                  {service.icon}
                </div>
                <div className="service-title-wrapper">
                  <h3>{service.title}</h3>
                  <span className="service-category" style={{ color: serviceCategories.find(c => c.id === service.category)?.color }}>
                    {serviceCategories.find(c => c.id === service.category)?.name}
                  </span>
                </div>
              </div>

              <p className="service-description">{service.description}</p>

              <div className="service-actions">
                <button className="details-btn" onClick={() => setSelectedService(service)}>
                  View Details
                </button>
                <button 
                  className="book-btn" 
                  onClick={handleBookAction}
                >
                  Book Now <FaArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="service-modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="service-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedService(null)}>×</button>
            
            <div className="modal-header">
              <div className="modal-icon" style={{ backgroundColor: `${serviceCategories.find(c => c.id === selectedService.category)?.color}15` }}>
                {selectedService.icon}
              </div>
              <div>
                <h3>{selectedService.title}</h3>
                <span className="modal-category" style={{ color: serviceCategories.find(c => c.id === selectedService.category)?.color }}>
                  {serviceCategories.find(c => c.id === selectedService.category)?.name}
                </span>
              </div>
            </div>

            <div className="modal-content">
              <p className="modal-description">{selectedService.details}</p>

              <div className="modal-cta">
                <button 
                  className="modal-book-btn" 
                  onClick={handleBookAction}
                >
                  Book Consultation
                </button>
                <button className="modal-close-btn" onClick={() => setSelectedService(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;