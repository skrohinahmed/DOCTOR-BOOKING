import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <h1>🏥 DocBook</h1>
          </Link>
        </div>
        <nav className="nav">
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
          >
            Find Doctors
          </Link>
          <Link 
            to="/my-appointments" 
            className={location.pathname === '/my-appointments' ? 'nav-link active' : 'nav-link'}
          >
            My Appointments
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
