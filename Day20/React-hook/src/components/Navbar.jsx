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
                            Dashboard
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
                            to="/reports"
                            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link' }
                            onClick={closeMenu}
                        >
                            Reports
                        </NavLink>
                    </li>
                    
                </ul>
                <button className="logout-btn">
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;