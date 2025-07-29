import React from 'react';
import { useAppContext } from '../App.jsx';
import { Link } from 'react-router-dom';

function MyAppointments() {
  const { appointments, cancelAppointment } = useAppContext();

  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      cancelAppointment(appointmentId);
    }
  };

  if (appointments.length === 0) {
    return (
      <div className="appointments-container">
        <h2>My Appointments</h2>
        <div className="no-appointments">
          <p>You don't have any appointments yet.</p>
          <Link to="/" className="find-doctors-btn">
            Find Doctors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="appointments-container">
      <h2>My Appointments</h2>
      
      <div className="appointments-list">
        {appointments.map(appointment => (
          <div key={appointment.id} className="appointment-card">
            <div className="appointment-info">
              <h3>{appointment.doctorName}</h3>
              <p className="specialty">{appointment.specialty}</p>
              <div className="appointment-details">
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>Time:</strong> {appointment.slot}</p>
                <p><strong>Status:</strong> 
                  <span className={`status ${appointment.status.toLowerCase()}`}>
                    {appointment.status}
                  </span>
                </p>
              </div>
            </div>
            
            <div className="appointment-actions">
              <button 
                onClick={() => handleCancelAppointment(appointment.id)}
                className="cancel-appointment-btn"
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointments;
