import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import {UserProvider} from './context/UserContext';
import { StudentProvider} from './context/StudentContext';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import AddStudent from './pages/AddStudent';
import Attendance from './pages/Attendance';
import Reports from './pages/Reports';
import Profile from './pages/Profile';


import 'C:/Users/mahen/OneDrive/Desktop/Intern/Day23/student-management/src/App.css';


function App() {

  return (
    <ThemeProvider>
      <UserProvider>
        <StudentProvider>
          <div className="app">
            <ToastContainer />
            <Sidebar />

          <div className= "app-container-with-sidebar">

            <div className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/add-student" element={<AddStudent />} />
                <Route path="/add" element={<AddStudent />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </div>
          </div>
        </StudentProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
