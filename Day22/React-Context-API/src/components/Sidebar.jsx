import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import './Sidebar.css';

function Sidebar() {
    const { user } = useUser();
    const { theme } = useTheme();

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    }

    return (
        <>

        <button className="sidebar-toggle" onClick={toggleSidebar}>
            ☰
        </button>

        <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={closeSidebar} />
        <div className={`sidebar ${theme} ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-top">
            <div className="sidebar-profile">
                <img src={user.profileImage} alt={user.name} className="sidebar-avatar" />
                <h3 className="sidebar-name">{user.name}</h3>
                <p className="sidebar-role">{user.designation}</p>
                <p className="sidebar-dept">{user.department}</p>
            </div>

            

            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <NavLink to="/" className="sidebar-link" onClick={closeSidebar}>
                            <span className="sidebar-icon">📊 </span> Dashboard
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/employees" className="sidebar-link" onClick={closeSidebar}>
                            <span className="sidebar-icon">👥</span> Employee
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/calendar" className="sidebar-link" onClick={closeSidebar}>
                            <span className="sidebar-icon">📅</span> Attendace
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/reports" className="sidebar-link" onClick={closeSidebar}>
                            <span className="sidebar-icon">📋</span> Reports
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile" className="sidebar-link" onClick={closeSidebar}>
                            <span className="sidebar-icon">👤</span> Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/settings" className="sidebar-link" onClick={closeSidebar}>
                            <span className="sidebar-icon">⚙️</span> Settings
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>

        <div className="sidebar-bottom">
            <ThemeToggle />
        </div>

        
    </div>
    </>
    );
}

export default Sidebar;