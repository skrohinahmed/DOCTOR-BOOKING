import React from 'react';
import { Link } from 'react-router-dom';
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};
function DoctorCard({ doctor }) {
  return (
    <div className="doctor-card">
      <div className="doctor-image">
        <img src={doctor.image} alt={doctor.name} />
      </div>
      
      <div className="doctor-info">
        <h3>{doctor.name}</h3>
        <p className="specialty">{doctor.specialty}</p>
        <p className="experience">{doctor.experience} experience</p>
        
        <div className="rating">
          <span className="stars">⭐ {doctor.rating}</span>
        </div>
        
        <div className="fee">
          <span className="fee-amount">{formatCurrency(doctor.fee)}</span>
          <span className="fee-label">consultation fee</span>
        </div>
        
        <Link to={`/doctors/${doctor.id}`} className="view-btn">
          View Profile & Book
        </Link>
      </div>
    </div>
  );
}

export default DoctorCard;
