import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Navbar.css';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <NavLink to="/" className="logo" onClick={closeMenu}>
                    <img src={logo} alt="Vimsa Logo" className="logo-img" />
                    <span className="logo-accent">VIM</span>SA
                </NavLink>

                <button className="hamburger-btn" onClick={toggleMenu}>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>

                <ul className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link' }
                            onClick={closeMenu}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link' }
                            onClick={closeMenu}
                        >
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/services"
                            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link' }
                            onClick={closeMenu}
                        >
                            Services
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/products"
                            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link' }
                            onClick={closeMenu}
                        >
                            Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link' }
                            onClick={closeMenu}
                        >
                            Contact
                        </NavLink>
                    </li>
                </ul>
                <NavLink to="/contact" className="nav-btn" onClick={closeMenu}>
                    Get in Touch
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;