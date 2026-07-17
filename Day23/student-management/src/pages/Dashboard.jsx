import React from 'react';
import { useStudents } from '../context/StudentContext';
import './Dashboard.css';

function Dashboard() {
    const { students } = useStudents();

    const totalStudents = students.length;
    const activeStudents = students.filter(s => s.status === 'Active').length;
    const inactiveStudents = students.filter(s => s.status === 'Inctive').length;

    const reactCount = students.filter(s => s.course === 'ReactJS').length;
    const jsCount = students.filter(s => s.course === 'javaScript').length;
    const nextCount = students.filter(s => s.course === 'next.js').length;

    const recentStudents = [...students].reverse().slice(0, 3);

    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <h1>📈 System Overview</h1>
                <p>Real-time metrics and student summaries</p>
            </header>

            <div className="metrics-grid">
                <div className="metric-card">
                    <h4>Total Students</h4>
                    <p className="metric-value">{totalStudents}</p>
                </div>
                <div className="metric-card active">
                    <h4>Active Registry</h4>
                    <p className="metric-value">{activeStudents}</p>
                </div>
                <div className="metric-card inactive">
                    <h4>Inactive Registry</h4>
                    <p className="metric-value">{inactiveStudents}</p>
                </div>
                <div className="metric-card course-stat">
                    <h4>ReactJS Course</h4>
                    <p className="metric-value">{reactCount}</p>
                </div>
                <div className="metric-card course-stat">
                    <h4>JavaScript Course</h4>
                    <p className="metric-value">{jsCount}</p>
                </div>
                <div className="metric-card course-stat">
                    <h4>Next.js Course</h4>
                    <p className="metric-value">{nextCount}</p>
                </div>
            </div>

            <div className="recent-activity-section">
                <h2>recently registered students</h2>
                {recentStudents.length === 0 ? (
                    <p className="no-recent-text">No Students registered yet.</p>
                ) : (
                    <div className="recent-table-wrapper">
                        <table className="recent-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>Course</th>
                                    <th>Batch</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentStudents.map(student => (
                                    <tr key={student.studentId}>
                                        <td className="bold">{student.studentId}</td>
                                        <td>
                                            <img 
                                                src={student.imageUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=50&h=50'}
                                                alt={student.fullName}
                                                className="recent-table-img"
                                            />
                                        </td>
                                        <td className="bold">{student.fullName}</td>
                                        <td><span className="table-batch course">{student.course}</span></td>
                                        <td>{student.batch}</td>
                                        <td>
                                            <span className={`table-batch status ${(student.status || 'active').toLowerCase()}`}> 
                                                {student.status || 'Active'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;