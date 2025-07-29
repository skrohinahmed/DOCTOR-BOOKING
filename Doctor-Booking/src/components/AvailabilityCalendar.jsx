import React from 'react';
import { useAppContext } from '../App';

function AvailabilityCalendar({ doctorId, onSlotSelect }) {
  const { availability } = useAppContext();
  const slots = availability[doctorId] || [];

  // Generate next 7 days
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="availability-calendar">
      {dates.map((date, index) => (
        <div key={index} className="date-column">
          <div className="date-header">
            <span className="date-text">{formatDate(date)}</span>
          </div>
          
          <div className="time-slots">
            {slots.length > 0 ? (
              slots.map((slot, slotIndex) => (
                <button
                  key={slotIndex}
                  className="time-slot"
                  onClick={() => onSlotSelect(slot)}
                >
                  {slot}
                </button>
              ))
            ) : (
              <p className="no-slots">No slots available</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AvailabilityCalendar;
