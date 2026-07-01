import React from 'react';
import StudentCard from './components/StudentCard';
import './App.css';

function App() {
  const students = [
    {
        name: "Pradhikshalini",
        age: 24,
        course: "React JS",
        email: "mahendranpradhikshalini@gmail.com",
        phone: "0702345678",
        college: "SLIIT",
        skills: ["HTML", "CSS", "JavaScript", "React"],
        image: "./pradhi.png"
    },
    {
        name: "Sha",
        age: 24,
        course: "Next JS",
        email: "sha@gmail.com",
        phone: "0745632890",
        college: "University of Colombo",
        skills: ["HTML", "CSS", "JavaScript", "React", "Python"],
        image: "./sha.png"
    },
    {
        name: "Midh",
        age: 24,
        course: "Python",
        email: "midh@gmail.com",
        phone: "0779087654",
        college: "SLIIT",
        skills: ["HTML", "CSS", "JavaScript", "React", "Python", "MongoDB"],
        image: "./midh.png"
    },
    {
        name: "Puvi",
        age: 20,
        course: "MongoDB",
        email: "midh@gmail.com",
        phone: "0776754233",
        college: "SLIIT",
        skills: ["HTML", "CSS", "JavaScript", "React", "Python", "MongoDB"],
        image: "./sha.png"
    },
    
  ]

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="main-title">Student Profile Cards</h1>
        <p className="subtitle">Practical Task: React JSX & Component Composition</p>
      </header>
      <main className="cards-grid">
        {students.map((student, index) => (
          <StudentCard key={index} student={student} />
        ))}
      </main>

      <footer className="app-footer">
        <p>Vite + React JSX Practical Exercise &copy; 2026</p>
      </footer>
    </div>
  );

}


export default App;
