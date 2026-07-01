import React from 'react';
import './StudentCard.css';

const StudentCard = ({student}) => {

    return (
        <div className="student-card">
            <div className="card-header">
                <img
                   src={student.image}
                   alt={student.name}
                   className="student-image"
                />
                <div className="header-info">
                    <h2 className="student-name">{student.name}</h2>
                    <span className="student-course">{student.course}</span>
                </div>
            </div>

            <div className="card-body">
                <div className="info-row">
                    <span className="info-label">Age</span>
                    <span className="info-value">{student.age}</span>
                </div>
                <div className="info-row">
                    <span className="info-label">College</span>
                    <span className="info-value">{student.college}</span>
                </div>
                <div className="info-row">
                    <span className="info-label">Email</span>
                    <span className="info-value email-link">{student.email}</span>
                </div>
                <div className="info-row">
                    <span className="info-label">Phone</span>
                    <span className="info-value">{student.phone}</span>
                </div>
            </div>
            

            <div className="skills-section">
                <h3 className="skills-title">Skills:</h3>
                <ul className="skills-list">
                    {student.skills.map((skill, index) => (
                        <li key={index} className="skill-item">{skill}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


export default StudentCard;