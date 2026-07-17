import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import {UserProvider, useUser} from './context/UserContext'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Employee from './pages/Employee';


import './App.css';

function HomeDashboard() {

  const {user} = useUser();

  return (
    <div className="dashboard-home">
      <h1 className="welcome-title">Welcome to the Portal</h1>
      <p className="welcome-subtitle">
        Use the navigation bar above or click "Employees" to view the employee registry.
      </p>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Employees</h3>
          <p className="stat-number">8</p>
        </div>
        <div className="stat-card">
          <h3>Active Employees</h3>
          <p className="stat-number active">6</p>
        </div>
        <div className="stat-card">
          <h3>Inactive Employees</h3>
          <p className="stat-number inactive">2</p>
        </div>
      </div>

      <div className="profile-overview">
        <h2>Your Profile Details</h2>
        <div className="profile-details-card">
          <img src={user.profileImage} alt={user.name} className="profile-card-avatar" />

          <div className="profile-card-info">
            <h3>{user.name}</h3>
            <p className="profile-card-role">{user.designation}</p>
            <p className="profile-card-dept">{user.department}</p>
            <p className="profile-card-email">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
};

function App() {

  const location = useLocation();
  const isEmployeePage = location.pathname === '/employees';

  return (
    <ThemeProvider>
      <UserProvider>
        <div className="app">

          <div className="app-container-with-sidebar">
            <Sidebar />
          
          <div className="main-content">
            <Routes>
              <Route path="/" element={<HomeDashboard />} />
              <Route path="/employees" element={<Employee />} />
            </Routes>
          </div>
        </div>
        </div>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;