import React from 'react';
import AttendanceCard from '../components/AttendanceCard';
import './AttendanceDashboard.css';

function AttendanceDashboard() {
  const students = [
    {
        id: "STU001",
        name: "Pradhikshalini",
        course:"Software Engineering",
        image: "./pradhi.png",
        initialPresent: 14,
        initialAbsent: 2
    },
    {
        id: "STU002",
        name: "Midhurshan",
        course:"Artificial Intelligence",
        image: "./midh.png",
        initialPresent: 16,
        initialAbsent: 1
    },
    {
        id: "STU003",
        name: "Achindu",
        course:"Graphic Designing",
        image: "./achindu.png",
        initialPresent: 10,
        initialAbsent: 7
    },
    {
        id: "STU004",
        name: "Ridma",
        course:"Front end Development",
        image: "./ridma.png",
        initialPresent: 11,
        initialAbsent: 6
    },
    {
        id: "STU005",
        name: "Himansa",
        course:"Data Science",
        image: "./himansa.png",
        initialPresent: 8,
        initialAbsent: 12
    }
  ];

  return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <span className="badge">Admin Portal</span>
                <h1 className="main-title">Student Attendance</h1>
                <p className="subtitle">Manage daily attendance records using React State</p>
            </header>

            <main className="dashboard-grid">
                {students.map((student, index) => (
                    <AttendanceCard
                        key={index}
                        id={student.id}
                        name={student.name}
                        course={student.course}
                        image={student.image}
                        initialPresent={student.initialPresent}
                        initialAbsent={student.initialAbsent}
                    />
                ))}
            </main>
            <footer className="dashboard-footer">
                <p>Apptron Solutions &copy; {new Date().getFullYear()}</p>
            </footer>
        </div>
  );
}

export default AttendanceDashboard;