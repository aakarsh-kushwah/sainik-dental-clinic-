import React, { useState } from 'react';
import './App.css';

// Components Import
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InfoBar from './components/InfoBar';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import KidsDental from './components/KidsDental';
import Services from './components/Services';

function App() {
  const [showServicesPopup, setShowServicesPopup] = useState(false);

  const openServicesPopup = () => {
    setShowServicesPopup(true);
    document.body.style.overflow = 'hidden';
  };

  const closeServicesPopup = () => {
    setShowServicesPopup(false);
    document.body.style.overflow = 'auto';
  };

  const handleBookingFromPopup = () => {
    closeServicesPopup();
    setTimeout(() => {
      const bookingSection = document.getElementById('booking-section');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <div className="App">
      <Navbar onServicesClick={openServicesPopup} />
      <Hero />
      <InfoBar />
      <KidsDental />
      <BookingForm />

      {/* Services Popup - Shows FULL Services component */}
      {showServicesPopup && (
        <div className="services-popup-overlay" onClick={closeServicesPopup}>
          <div className="services-popup-container" onClick={(e) => e.stopPropagation()}>
            {/* CHANGE THIS BUTTON CLASSNAME */}
            <button className="services-popup-btn" onClick={closeServicesPopup}>
              ×
            </button>

            {/* This will show ALL 13 services */}
            <Services isPopup={true} onBookNow={handleBookingFromPopup} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;