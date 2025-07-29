import React, { useState } from 'react';
import { useAppContext } from '../App.jsx';

function BookingForm({ doctor, selectedSlot, onComplete, onCancel }) {
  const { bookAppointment } = useAppContext();
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    reason: ''
  });
  const [isBooking, setIsBooking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    setPatientInfo({
      ...patientInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsBooking(true);

    // Simulate API call delay
    setTimeout(() => {
      const appointmentDate = new Date().toISOString().split('T')[0];
      bookAppointment(doctor.id, selectedSlot, appointmentDate);
      
      setIsBooking(false);
      setShowSuccess(true);

      // Auto-close after 2 seconds
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 1000);
  };

  if (showSuccess) {
    return (
      <div className="booking-modal">
        <div className="modal-content success">
          <div className="success-icon">✅</div>
          <h3>Appointment Booked Successfully!</h3>
          <p>Your appointment with {doctor.name} at {selectedSlot} has been confirmed.</p>
          <p>A confirmation email has been sent to {patientInfo.email}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Book Appointment</h3>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>

        <div className="appointment-summary">
          <p><strong>Doctor:</strong> {doctor.name}</p>
          <p><strong>Specialty:</strong> {doctor.specialty}</p>
          <p><strong>Time:</strong> {selectedSlot}</p>
          <p><strong>Fee:</strong> ${doctor.fee}</p>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={patientInfo.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={patientInfo.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={patientInfo.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Reason for Visit</label>
            <textarea
              name="reason"
              value={patientInfo.reason}
              onChange={handleInputChange}
              rows="3"
              placeholder="Brief description of your symptoms or reason for consultation"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" disabled={isBooking} className="book-btn">
              {isBooking ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
