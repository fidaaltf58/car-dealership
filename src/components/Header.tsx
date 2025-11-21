import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="contact-info">
            <span>8364 NW 74th St, Miami, Florida, United States 33166.</span>
            <span>+1 (510) 631-3167</span>
          </div>
          <div className="header-links">
            <Link to="/inventory">Inventory</Link>
            <Link to="/services">Services</Link>
            <Link to="/appointment">Make Appointment</Link>
            <a href="#financing">Financing</a>
          </div>
        </div>
      </div>
      
      <div className="header-main">
        <div className="container">
          <Link to="/" className="logo">
            <h1>US 1 MOTORS</h1>
          </Link>
          <nav className="main-nav">
            <Link to="/inventory">All Inventory</Link>
            <Link to="/inventory/cars">Cars</Link>
            <Link to="/inventory/trucks">Trucks</Link>
            <Link to="/inventory/suvs">SUVs</Link>
            <Link to="/admin">Admin</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;