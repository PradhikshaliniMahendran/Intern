import React from 'react';
import { NavLink } from 'react-router-dom';
import{ useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

function Navbar() {
    const { user } = useUser();
    const { theme } = useTheme();

    return (
        <nav className={`navbar ${theme}`}>
            <div className="nav-container">
                <NavLink to="/" className="logo">
                   🏢 Student Portal
                </NavLink>
                <ul className="nav-links">
                    <li><NavLink to="/" className="nav-link">Dashboard</NavLink></li>
                    <li><NavLink to="/students" className="nav-link">Students</NavLink></li>
                    <li><NavLink to="/attendance" className="nav-link">Attendance</NavLink></li>
                </ul>
                <div className="nav-right">
                    <img src={user.profileImage} alt={user.name} className="navbar-avatar" />

                    <span className="nav-username">{user.name}</span>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;