import React from 'react';
import './StudentCard.css';

function StudentCard({ student, onEdit, onDelete }) {
    const defaultImage = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150';

    return (
        <div className="student-card">
            <div className="card-top">
                <img
                  src={student.imageUrl || defaultImage}
                  alt={student.fullName}
                  className="card-image"
                  onError={(e) => { e.target.src = defaultImage; }}
                />
                <div className="card-identity">
                    <h3 className="card-name">{student.fullName}</h3>
                    <span className="card-id">{student.studentId}</span>
                    <span className="card-course">{student.course}</span>
                </div>
            </div>

            <div className="card-details">
                <div className="detail-row">
                    <span className="detail-label">📧 Email</span>
                    <span className="detail-value">{student.email}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">📞 Phone</span>
                    <span className="detail-value">{student.phone}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">🎂 Age</span>
                    <span className="detail-value">{student.age} years</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">⚥ Gender</span>
                    <span className="detail-value">{student.gender}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">📍 Address</span>
                    <span className="detail-value">{student.address}</span>
                </div>
            </div>

            <div className="student-actions">
                <button className="btn-edit" onClick={() => onEdit(student)}>✏️</button>
                <button className="btn-delete" onClick={() => onDelete(student.studentId)}>🗑️</button>
            </div>

            <div className="card-footer">
                <span className="registered-badge">✓ Registered Successfully</span>
            </div>
        </div>
    );
}

export default StudentCard;