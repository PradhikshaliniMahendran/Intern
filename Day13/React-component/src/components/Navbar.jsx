import React from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <a href="#" className="logo">
                <img src={logo} alt="Apptron Logo" className="logo-img" />
                    <span className="logo-accent">App</span>tron
                </a>
                <ul className="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <button className="nav-btn">Get in Touch</button>
            </div>
        </nav>
    );
}

export default Navbar;