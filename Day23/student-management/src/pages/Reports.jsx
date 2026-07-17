import React from 'react';
import { useStudents } from '../context/StudentContext';
import './Reports.css';

function Reports() {
    const { students } = useStudents();
    const total = students.length;
    const active = students.filter(s => s.status === 'Active').length;

    return (
        <div className="reports-page">
            <h1>📋 Reports</h1>
            <div className="reports-cards">
                <div className="rcard">
                    <h3>Total Students</h3>
                    <p className="rval blue">{students.length}</p>
                </div>
                <div className="rcard">
                    <h3>Active Students</h3>
                    <p className="rval blue">{students.length}</p>
                </div>
            </div>
        </div>
    );
}

export default Reports;