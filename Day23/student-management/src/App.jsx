import React from 'react';
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
import Settings from './pages/Settings';

import './App.css';

const SIDEBAR_PATHS = ['/students', '/attendance', '/reports', '/profile', '/settings', '/add-student', '/add'];

function App() {
  const location = useLocation();
  const isSidebarPage = SIDEBAR_PATHS.includes(location.pathname);

  return (
    <ThemeProvider>
      <UserProvider>
        <StudentProvider>
          <div className="app">
            {!isSidebarPage && <Navbar />}

          <div className={isSidebarPage ? "app-container-with-sidebar" : "app-container-full"}>
            {isSidebarPage && <Sidebar />}

            <div className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/add-student" element={<AddStudent />} />
                <Route path="/add" element={<AddStudent />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
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
