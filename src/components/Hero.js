import React, { useEffect, useState, useCallback } from 'react';
import { FaShieldAlt, FaArrowRight, FaCheckCircle, FaStar, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const clinicImages = [
    "/images/WhatsApp Image 2025-11-30 at 23.28.35_aa7b7351.jpg",
    "/images/WhatsApp Image 2025-11-30 at 23.28.35_c8173c6b.jpg",
    "/images/WhatsApp Image 2025-11-30 at 23.28.37_b9716545.jpg",
    "/images/WhatsApp Image 2025-11-30 at 23.28.38_aee084b8.jpg",
    "/images/WhatsApp Image 2025-11-30 at 23.28.38_dc7620a1.jpg",
    "/images/WhatsApp Image 2025-11-30 at 23.28.38_fd67af50.jpg"
  ];

  // Lightbox functions
  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = useCallback((e) => {
    if (e) e.stopPropagation();
    setPhotoIndex((prevIndex) => (prevIndex + 1) % clinicImages.length);
  }, [clinicImages.length]);

  const prevImage = useCallback((e) => {
    if (e) e.stopPropagation();
    setPhotoIndex((prevIndex) => (prevIndex + clinicImages.length - 1) % clinicImages.length);
  }, [clinicImages.length]);

  // Keyboard support
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, nextImage, prevImage]);

  // Swipe handlers
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) nextImage();
    if (isRightSwipe) prevImage();
  };

  return (
    <header className="hero-section" id="home">
      {/* Lightbox Overlay */}
      {isOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close-btn" onClick={closeLightbox}>
            <FaTimes />
          </button>

          <button className="nav-btn nav-left" onClick={prevImage}>
            <FaChevronLeft />
          </button>
          <button className="nav-btn nav-right" onClick={nextImage}>
            <FaChevronRight />
          </button>

          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={clinicImages[photoIndex]}
              alt={`Clinic View ${photoIndex + 1}`}
              className="lightbox-img fade-animation"
              key={photoIndex}
            />

            <div className="image-counter">
              {photoIndex + 1} / {clinicImages.length}
            </div>
          </div>
        </div>
      )}

      {/* Hero Content Container */}
      <div className="hero-container">
        {/* Left Content Side */}
        <div className="hero-content">
          {/* Badge */}
          <div className="badge-pill bounce-in">
            <FaShieldAlt className="badge-icon" /> #1 Rated Dental Clinic
          </div>
  
          {/* Main Heading - FIXED STRUCTURE */}
          <h1 className="slide-up-text hero-heading">
            <span className="hero-line-1">Sainik Dental</span>
            <span className="hero-gradient">And</span>
            <span className="hero-line-3">Kids Clinic</span>
          </h1>

          {/* Description */}
          <p className="fade-in-text hero-description">
            Experience pain-free dentistry with cutting-edge technology and
            compassionate care from our expert team. Your journey to a confident
            smile starts here.
          </p>

          {/* Stats Row */}
          <div className="stats-row fade-in-up">
            <div className="stat-item">
              <h3>18+</h3>
              <span>Years Experience</span>
            </div>
            <div className="stat-item">
              <h3>164k+</h3>
              <span>Happy Patients</span>
            </div>
            <div className="stat-item">
              <h3>4.9★</h3>
              <span>Patient Rating</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hero-btns fade-in-up">
            <a href="#booking-section" className="btn btn-primary-hero">
              Book Free Consultation <FaArrowRight className="btn-icon" />
            </a>
          </div>

          {/* Doctor Badge */}
          <div className="doctor-badge fade-in-up-delay">
            <div className="doctor-group">
              <span className="doctor-avatar">👨‍⚕️</span>
              <div className="doctor-info">
                <h4>Dr. Sandeep Patel</h4>
                <p>Implant Specialist</p>
              </div>
              <FaCheckCircle className="verified-icon" />
            </div>
            <div className="doctor-group">
              <span className="doctor-avatar">👩‍⚕️</span>
              <div className="doctor-info">
                <h4>Dr. Neha Patel</h4>
                <p>Cosmetic Dentistry</p>
              </div>
              <FaCheckCircle className="verified-icon" />
            </div>
          </div>
        </div>

        {/* Right Image Side */}
        <div className="hero-image-section">
          {/* Main Doctor Image Container */}
          <div className="doctor-image-container">
            <img
              src="/images/doctors_img.png"
              alt="Dr. Neha & Team"
              className="doctor-main-img"
            />

            {/* Floating Experience Badge */}
            <div className="floating-experience">
              <div className="exp-content">
                <h3>18+</h3>
                <p>Years of Excellence</p>
              </div>
            </div>
          </div>

          {/* Clinic Photo Stack */}
          <div className="clinic-preview-section">
            <div className="preview-header">
              <span className="preview-label">Clinic Gallery</span>
              <div className="rating-mini">
                <FaStar color="#f59e0b" /> 4.9 (2k+ Reviews)
              </div>
            </div>

            <div className="photo-stack">
              {clinicImages.slice(0, 4).map((imgUrl, index) => (
                <div
                  key={index}
                  className="stack-item"
                  style={{ '--i': index }}
                  onClick={() => openLightbox(index)}
                >
                  <img src={imgUrl} alt="Clinic Interior" />
                </div>
              ))}
              <div className="stack-item view-more" onClick={() => openLightbox(0)}>
                <span>+{clinicImages.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="hero-bg-elements">
        <div className="bg-circle-1"></div>
        <div className="bg-circle-2"></div>
        <div className="bg-circle-3"></div>
      </div>
    </header>
  );
};

export default Hero;