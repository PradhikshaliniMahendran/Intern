import React from 'react';
import { useUser } from '../context/UserContext';
import { useStudents } from '../context/StudentContext';
import './Profile.css'

function Profile() {
    const { user } = useUser();
    const { students } = useStudents();

    const totalStudents = students.length;
    const activeStudents = students.filter(s => s.status === 'Active').length;

    return (
        <div className="profile-page">
            <header className="profile-header">
                <h1>👤 My Profile</h1>
                <p>Your account details and system access information</p>
            </header>

            <div className="profile-layout">
                <div className="profile-avatar-card">
                    <img
                        src={user.profileImage}
                        alt={user.name}
                        className="profile-main-avatar"
                    />
                    <h2>{user.name}</h2>
                    <span className="profile-designation-badge">{user.designation}</span>
                    <p className="profile-dept">{user.department}</p>
                </div>

                <div className="profile-details-section">
                    <div className="profile-info-card">
                        <h3>Contact Information</h3>
                        <div className="row-info">
                            <span className="info-label">📧 Email</span>
                            <span className="info-value">{user.email}</span>
                        </div>
                        <div className="row-info">
                            <span className="info-label">🏢 Department</span>
                            <span className="info-value">{user.department}</span>
                        </div>
                        <div className="row-info">
                            <span className="info-label">🏷️ Role</span>
                            <span className="info-value">{user.designation}</span>
                        </div>
                        <div className="row-info">
                            <span className="info-label">🆔 Admin ID</span>
                            <span className="info-value">{user.id}</span>
                        </div>
                    </div>

                    <div className="profile-stats-card">
                        <h3>System Summary</h3>
                        <div className="profile-stats-row">
                            <div className="profile-stat">
                                <p className="pstat-value">{totalStudents}</p>
                                <p className="pstat-label">Total Students</p>
                            </div>
                            <div className="profile-stat active">
                                <p className="pstat-value">{activeStudents}</p>
                                <p className="pstat-label">Active tudents</p>
                            </div>
                            <div className="profile-stat inactive">
                                <p className="pstat-value">{totalStudents - activeStudents}</p>
                                <p className="pstat-label">Inactive Students</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Profile;