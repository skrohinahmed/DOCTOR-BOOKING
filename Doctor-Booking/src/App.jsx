import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import DoctorList from './components/DoctorList.jsx';
import DoctorDetail from './components/DoctorDetail.jsx';
import MyAppointments from './components/MyAppointments.jsx';
import './styles/App.css';

// Global Context for State Management
const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

function App() {
  // Mock data for doctors
  const [doctors] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      experience: '10 years',
      rating: 4.8,
      image: 'https://th.bing.com/th/id/OIP.Nd05cGLnTSfWm3As_q5WlQAAAA?w=115&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      bio: 'Experienced cardiologist specializing in heart disease prevention and treatment.',
      fee: 150
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Pediatrics',
      experience: '8 years',
      rating: 4.9,
      image: 'https://th.bing.com/th/id/OIP.Nd05cGLnTSfWm3As_q5WlQAAAA?w=115&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      bio: 'Dedicated pediatrician with expertise in child healthcare and development.',
      fee: 120
    },
    {
      id: 3,
      name: 'Dr. Emily Davis',
      specialty: 'Dermatology',
      experience: '12 years',
      rating: 4.7,
      image: 'https://th.bing.com/th/id/OIP.Nd05cGLnTSfWm3As_q5WlQAAAA?w=115&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      bio: 'Board-certified dermatologist specializing in skin conditions and cosmetic procedures.',
      fee: 180
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      experience: '15 years',
      rating: 4.6,
      image: 'https://th.bing.com/th/id/OIP.Nd05cGLnTSfWm3As_q5WlQAAAA?w=115&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      bio: 'Orthopedic surgeon with expertise in joint replacement and sports medicine.',
      fee: 200
    }
  ]);

  // Available time slots for each doctor
  const [availability, setAvailability] = useState({
    1: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
    2: ['08:00 AM', '09:00 AM', '10:00 AM', '01:00 PM', '02:00 PM', '03:00 PM'],
    3: ['10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '04:00 PM', '05:00 PM'],
    4: ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '04:00 PM', '05:00 PM']
  });

  // User appointments
  const [appointments, setAppointments] = useState([]);

  // Book an appointment
  const bookAppointment = (doctorId, slot, date) => {
    const doctor = doctors.find(d => d.id === doctorId);
    const newAppointment = {
      id: Date.now(),
      doctorId,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      slot,
      date,
      status: 'Confirmed'
    };
    
    setAppointments([...appointments, newAppointment]);
    
    // Remove booked slot from availability
    setAvailability(prev => ({
      ...prev,
      [doctorId]: prev[doctorId].filter(s => s !== slot)
    }));
  };

  // Cancel an appointment
  const cancelAppointment = (appointmentId) => {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (appointment) {
      // Add slot back to availability
      setAvailability(prev => ({
        ...prev,
        [appointment.doctorId]: [...prev[appointment.doctorId], appointment.slot]
      }));
      
      // Remove appointment
      setAppointments(appointments.filter(apt => apt.id !== appointmentId));
    }
  };

  const contextValue = {
    doctors,
    availability,
    appointments,
    bookAppointment,
    cancelAppointment
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<DoctorList />} />
              <Route path="/doctors/:id" element={<DoctorDetail />} />
              <Route path="/my-appointments" element={<MyAppointments />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
