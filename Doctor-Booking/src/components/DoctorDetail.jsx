import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAppContext } from '../App.jsx';
import AvailabilityCalendar from './AvailabilityCalendar.jsx';
import BookingForm from './BookingForm.jsx';
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};

function DoctorDetail() {
  const { id } = useParams();
  const { doctors } = useAppContext();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');

  const doctor = doctors.find(d => d.id === parseInt(id));

  if (!doctor) {
    return <Navigate to="/" replace />;
  }

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setShowBookingForm(true);
  };

  const handleBookingComplete = () => {
    setShowBookingForm(false);
    setSelectedSlot('');
  };

  return (
    <div className="doctor-detail">
      <div className="doctor-profile">
        <div className="profile-header">
          <img src={doctor.image} alt={doctor.name} className="profile-image" />
          <div className="profile-info">
            <h1>{doctor.name}</h1>
            <p className="specialty">{doctor.specialty}</p>
            <p className="experience">{doctor.experience} experience</p>
            <div className="rating">
              <span className="stars">⭐ {doctor.rating}</span>
              <span className="reviews">(125 reviews)</span>
            </div>
          </div>
        </div>
        
        <div className="profile-details">
          <h3>About</h3>
          <p>{doctor.bio}</p>
          
          <div className="fee-info">
            <h3>Consultation Fee</h3>
            <p className="fee-amount">{formatCurrency(doctor.fee)}</p>
          </div>
        </div>
      </div>

      <div className="booking-section">
        <h3>Available Time Slots</h3>
        <AvailabilityCalendar 
          doctorId={doctor.id} 
          onSlotSelect={handleSlotSelect}
        />
      </div>

      {showBookingForm && (
        <BookingForm
          doctor={doctor}
          selectedSlot={selectedSlot}
          onComplete={handleBookingComplete}
          onCancel={() => setShowBookingForm(false)}
        />
      )}
    </div>
  );
}

export default DoctorDetail;
