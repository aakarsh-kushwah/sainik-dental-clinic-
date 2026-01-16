import React, { useState, useCallback, useEffect, useRef } from 'react';
import { FaChild, FaSmile, FaHeart, FaStar, FaTimes, FaChevronLeft, FaChevronRight, FaPlay, FaPause } from 'react-icons/fa';
import './KidsDental.css';

const KidsDental = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const videoRef = useRef(null);
  const minSwipeDistance = 50;

  // Kids clinic images
  const kidsImages = [
    "/images/k1.jpeg",
    "/images/k2.jpeg",
    "/images/k3.jpeg",
    "/images/k4.jpeg",
    "/images/k5.jpeg",
    "/images/k6.jpeg",
    "/images/k7.jpeg",
    "/images/k8.jpeg",
    "/images/k9.jpeg",
    "/images/k10.jpeg",
    "/images/k11.jpeg",
    "/images/k12.jpeg"
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
    setPhotoIndex((prevIndex) => (prevIndex + 1) % kidsImages.length);
  }, [kidsImages.length]);

  const prevImage = useCallback((e) => {
    if (e) e.stopPropagation();
    setPhotoIndex((prevIndex) => (prevIndex + kidsImages.length - 1) % kidsImages.length);
  }, [kidsImages.length]);

  // Video play/pause handler
  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPaused(false);
      } else {
        videoRef.current.pause();
        setIsVideoPaused(true);
      }
    }
  };

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

  // Check if video is paused (for autoplay blocked scenarios)
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      const handlePause = () => setIsVideoPaused(true);
      const handlePlay = () => setIsVideoPaused(false);

      video.addEventListener('pause', handlePause);
      video.addEventListener('play', handlePlay);

      // Check initial state
      if (video.paused) {
        setIsVideoPaused(true);
      }

      return () => {
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('play', handlePlay);
      };
    }
  }, []);

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
    <section className="kids-dental-section" id="kids-dental">

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
              src={kidsImages[photoIndex]}
              alt={`Kids Dental Area ${photoIndex + 1}`}
              className="lightbox-img fade-animation"
              key={photoIndex}
            />

            <div className="image-counter">
              {photoIndex + 1} / {kidsImages.length}
            </div>
          </div>
        </div>
      )}

      {/* Kids Dental Content Container */}
      <div className="kids-container">

        {/* Left Content Side */}
        <div className="kids-content">

          {/* Special Badge for Kids */}
          <div className="kids-badge bounce-in">
            <FaChild className="badge-icon" /> Child-Friendly Zone
          </div>

          {/* Main Heading - Special Kids Section */}
          <h1 className="kids-heading slide-up-text">
            <span className="kids-main-text">Where Little Smiles</span>
            <span className="kids-gradient-text"> Grow Happily!</span>
          </h1>

          {/* Description - Kids Focused */}
          <p className="kids-description fade-in-text">
            Our vibrant, toy-filled pediatric dental zone is specially designed to
            make dental visits fun and fear-free. With colorful interiors, engaging
            activities, and gentle care, we transform dental checkups into exciting
            adventures for your little ones.
          </p>

          {/* Special Services for Kids */}
          <div className="kids-services fade-in-up-delay">
            <h3>Special Kids Services:</h3>
            <div className="services-grid">
              <span className="service-tag">Cavity Prevention</span>
              <span className="service-tag">Dental Education</span>
              <span className="service-tag">Braces for Kids</span>
              <span className="service-tag">Painless Treatment</span>
              <span className="service-tag">Happy Visits</span>
              <span className="service-tag">Growth Monitoring</span>
            </div>
          </div>

          {/* CTA Button */}
          {/* <div className="kids-cta fade-in-up">
            <a href="#contact" className="btn btn-kids-primary">
              Book Kids Appointment
            </a>
          </div> */}
          <div className="kids-cta fade-in-up">
            <a
              href="#booking-section"
              className="btn btn-kids-primary"
              onClick={(e) => {
                e.preventDefault();
                const bookingSection = document.getElementById('booking-section');
                if (bookingSection) {
                  bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

                  // Highlight the section
                  bookingSection.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.5)';
                  bookingSection.style.transition = 'box-shadow 0.5s ease';

                  setTimeout(() => {
                    bookingSection.style.boxShadow = '';
                  }, 2000);
                }
              }}
            >
              Book Kids Appointment
            </a>
          </div>

        </div>

        {/* Right Image Side */}
        <div className="kids-image-section">

          {/* Main Kids Area Video */}
          <div className="kids-video-container">
            <video
              className="kids-main-video"
              autoPlay
              loop
              muted
              playsInline
              ref={videoRef}
            >
              <source src="/images/k.mp4" type="video/mp4" />
              {/* Fallback for browsers that don't support video */}
              <img
                src="/images/k.jpeg"
                alt="Kids Dental Special Area"
                className="kids-video-fallback"
              />
            </video>

            {/* Play/Pause Overlay */}
            <div
              className="video-play-overlay"
              onClick={handlePlayVideo}
              style={{ opacity: isVideoPaused ? 1 : 0 }}
            >
              {isVideoPaused ? <FaPlay /> : <FaPause />}
            </div>

            {/* Floating Fun Badge */}
            <div className="floating-fun-badge">
              <div className="fun-content">
                <FaSmile className="fun-icon" />
                <p>Fun Dental Visits!</p>
              </div>
            </div>
          </div>

          {/* Kids Gallery Preview */}
          <div className="kids-gallery-section">
            <div className="gallery-header">
              <span className="gallery-label">Kids Zone Gallery</span>
              <div className="gallery-rating">
                <FaStar color="#f59e0b" /> 5.0 (Happy Parents)
              </div>
            </div>

            <div className="kids-photo-grid">
              {kidsImages.slice(0, 6).map((imgUrl, index) => (
                <div
                  key={index}
                  className="grid-item"
                  onClick={() => openLightbox(index)}
                >
                  <img src={imgUrl} alt={`Kids Area ${index + 1}`} />
                  <div className="grid-overlay">
                    <FaChild className="overlay-icon" />
                  </div>
                </div>
              ))}
              <div className="grid-item view-all" onClick={() => openLightbox(0)}>
                <span>+{kidsImages.length}<br />Photos</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Kids Theme Background Elements */}
      <div className="kids-bg-elements">
        <div className="bg-bubble bg-bubble-1"></div>
        <div className="bg-bubble bg-bubble-2"></div>
        <div className="bg-bubble bg-bubble-3"></div>
        <div className="bg-bubble bg-bubble-4"></div>
      </div>

    </section>
  );
};

export default KidsDental;