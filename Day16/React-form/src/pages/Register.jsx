import React, {useState} from 'react';
import StudentForm from '../components/StudentForm';
import StudentCard from '../components/StudentCard';
import './Register.css';

function Register() {
    const [students, setStudents] = useState([]);

    const [showForm, setShowForm] = useState(true);

    const handleRegister = (newStudent) => {
        setStudents((prev) => [newStudent, ...prev]);
        setShowForm(false);
    };

    return (
        <div className="register-page">
            <header className="register-header">
                <span className="badge">React 6 — Event Handling &amp; Forms</span>
                <h1 className="main-title">Student Registration</h1>
                <p className="subtitle">Fill the form below to register a new student</p>
            </header>

            <div className="register-body">
                <div className="form-container">
                    <div className="form-card">
                        <div className="form-card-header">
                            <h2>New Student Details</h2>
                            {!showForm && (
                                <button className="add-more-btn" onClick={() => setShowForm(true)}>
                                    + Add Another Student
                                </button>
                            )}
                        </div>
                        {showForm ? (
                            <StudentForm onRegister={handleRegister} />
                        ) : (
                            <div className="success-message">
                                <div className="success-icon">✓</div>
                                <p>Student registered successfully!</p>
                                <button className="add-more-btn wide" onClick={() => setShowForm(true)}>
                                    Register Another Student
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {students.length > 0 && (
                    <div className="cards-container">
                        <h2 className="cards-title">
                            Registered Students
                            <span className="count-badge">{students.length}</span>
                        </h2>

                        {students.map((student, index) => (
                            <StudentCard key={index} student={student} />
                        ))}
                    </div>
                )}
            </div>

            <footer className="register-footer">
                <p>Apptron Solutions &copy; {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}

export default Register;