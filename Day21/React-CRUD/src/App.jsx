import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddStudent />} />
      </Routes>
    </div>
  );
}

export default App;