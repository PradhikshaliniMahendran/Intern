import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import './Sidebar.css';

function Sidebar() {
    const { user } = useUser();
    const { theme } = useTheme();

    return (
        <div className={`sidebar ${theme}`}>
            <div className="sidebar-top">
            <div className="sidebar-profile">
                <img src={user.profileImage} alt={user.name} className="sidebar-avatar" />
                <h3 className="sidebar-name">{user.name}</h3>
                <p className="sidebar-role">{user.designation}</p>
                <p className="sidebar-dept">{user.department}</p>
            </div>

            <div className="sidebar-toggle-wrapper">
                <ThemeToggle />
            </div>

            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <NavLink to="/" className="sidebar-link">
                            <span className="sidebar-icon">📊 </span>Dashboard
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/employees" className="sidebar-link">
                            <span className="sidebar-icon">👥</span>Employees
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/calendar" className="sidebar-link">
                            <span className="sidebar-icon">📅</span>Calendar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" className="sidebar-link">
                            <span className="sidebar-icon">📋</span>Reports
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>

        
    </div>
    );
}

export default Sidebar;