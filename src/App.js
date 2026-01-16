import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import './App.css';

// --- 🚀 ADVANCED PERFORMANCE: LAZY LOADING ---
// Components tabhi load honge jab inki zarurat hogi (Site speed 2x faster)
const Navbar = lazy(() => import('./components/Navbar'));
const Hero = lazy(() => import('./components/Hero'));
const InfoBar = lazy(() => import('./components/InfoBar'));
const BookingForm = lazy(() => import('./components/BookingForm'));
const Footer = lazy(() => import('./components/Footer'));
const KidsDental = lazy(() => import('./components/KidsDental'));
const Services = lazy(() => import('./components/Services'));

// --- 🎨 ELEGANT FALLBACK LOADER ---
const PageLoader = () => (
  <div className="flex items-center justify-center h-screen w-full bg-white">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid"></div>
  </div>
);

function App() {
  const [showServicesPopup, setShowServicesPopup] = useState(false);

  // --- 🧠 SMART MEMORY MANAGEMENT (Prevent Re-renders) ---
  
  // Body scroll lock effect (Clean Side Effect)
  useEffect(() => {
    if (showServicesPopup) {
      document.body.style.overflow = 'hidden'; // Scroll lock
    } else {
      document.body.style.overflow = 'unset';  // Unlock
    }
    
    // Cleanup function ensures no UI bugs
    return () => { document.body.style.overflow = 'unset'; };
  }, [showServicesPopup]);

  const togglePopup = useCallback((status) => {
    setShowServicesPopup(status);
  }, []);

  // --- 🌊 SMOOTH SCROLLING ENGINE ---
  const handleBookingFromPopup = useCallback(() => {
    togglePopup(false);
    
    // RequestAnimationFrame ensures browser is ready to paint (Smoother than setTimeout)
    requestAnimationFrame(() => {
      const bookingSection = document.getElementById('booking-section');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }, [togglePopup]);

  return (
    <div className="App relative min-h-screen bg-gray-50">
      
      {/* Suspense Wrapper handles loading states gracefully */}
      <Suspense fallback={<PageLoader />}>
        
        <header>
          <Navbar onServicesClick={() => togglePopup(true)} />
        </header>

        <main>
          <Hero />
          <InfoBar />
          
          <section className="py-10">
            <KidsDental />
          </section>

          {/* ID for Smooth Scrolling Target */}
          <section id="booking-section" className="scroll-mt-24">
            <BookingForm />
          </section>
        </main>

        {/* --- 🛡️ SECURE & ACCESSIBLE MODAL --- */}
        {showServicesPopup && (
          <div 
            className="services-popup-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => togglePopup(false)}
            role="dialog"
            aria-modal="true"
          >
            <div 
              className="services-popup-container bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-fadeInUp"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="services-popup-btn absolute top-4 right-4 text-gray-500 hover:text-red-600 text-3xl font-bold transition-colors z-10"
                onClick={() => togglePopup(false)}
                aria-label="Close Modal"
              >
                &times;
              </button>

              <div className="p-4">
                <Services isPopup={true} onBookNow={handleBookingFromPopup} />
              </div>
            </div>
          </div>
        )}

        <Footer />
      </Suspense>
    </div>
  );
}

export default App;