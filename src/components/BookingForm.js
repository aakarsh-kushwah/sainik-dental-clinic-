import React, { useState } from 'react';
import { User, Phone, Calendar, MessageSquare, ArrowRight, CheckCircle2, Languages } from 'lucide-react';
import './BookingForm.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", date: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [language, setLanguage] = useState("english");

  const t = {
    english: { title: "Book Appointment", name: "Full Name", phone: "Phone Number", date: "Select Date", btn: "Confirm Now" },
    hindi: { title: "अपॉइंटमेंट बुक करें", name: "पूरा नाम", phone: "फ़ोन नंबर", date: "तारीख चुनें", btn: "अभी बुक करें" }
  };

  const curr = language === "english" ? t.english : t.hindi;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => { setIsSubmitted(false); setFormData({ name: "", phone: "", date: "", message: "" }); }, 4000);
  };

  return (
    <section className="app-container" id="booking-section">
      <div className="form-wrapper">
        {/* Top Navigation Style Header */}
        <div className="form-nav">
          <button className="lang-pill" onClick={() => setLanguage(l => l === 'english' ? 'hindi' : 'english')}>
            <Languages size={16} /> {language === 'english' ? 'Hindi' : 'English'}
          </button>
        </div>

        {isSubmitted ? (
          <div className="status-screen">
            <div className="check-ring"><CheckCircle2 size={48} strokeWidth={1.5} color="#00C853" /></div>
            <h2>Booking Confirmed</h2>
            <p>We'll reach out to you shortly, {formData.name.split(' ')[0]}.</p>
          </div>
        ) : (
          <div className="content-body">
            <div className="heading-area">
              <h1>{curr.title}</h1>
              <p>Quick and secure booking for your dental health.</p>
            </div>

            <form onSubmit={handleSubmit} className="modern-form">
              <div className="input-field">
                <User className="field-icon" size={20} />
                <input type="text" placeholder={curr.name} required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>

              <div className="input-field">
                <Phone className="field-icon" size={20} />
                <input type="tel" placeholder={curr.phone} pattern="[0-9]{10}" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>

              <div className="input-field">
                <Calendar className="field-icon" size={20} />
                <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
              </div>

              <div className="input-field align-top">
                <MessageSquare className="field-icon" size={20} />
                <textarea placeholder="Message (Optional)" rows="2" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
              </div>

              <button type="submit" className="action-button">
                {curr.btn} <ArrowRight size={20} />
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingForm;