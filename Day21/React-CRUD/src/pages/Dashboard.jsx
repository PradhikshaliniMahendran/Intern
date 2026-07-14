import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

import StudentCard from 'C:/Users/mahen/OneDrive/Desktop/Intern/Day16/React-form/src/components/StudentCard';
import StudentForm from 'C:/Users/mahen/OneDrive/Desktop/Intern/Day16/React-form/src/components/StudentForm';



import './Dashboard.css';

function Dashboard() {
    const [students, setStudents] = useLocalStorage('students', []);
    const [editingStudent, setEditingStudent] = useState(null);

    const deleteStudent = (studentId) => {
        if(window.confirm('Delete this student?')) {
            setStudents(students.filter(s => s.studentId !== studentId));
        }
    };

    const updateStudent = (updatedStudent) => {

        const { password, confirmPassword, ...studentData} = updatedStudent;

        const updatedStudents = students.map(s => s.studentId === updatedStudent.studentId ? studentData : s);
        setStudents(updatedStudents);
        setEditingStudent(null);
    };

    const startEditing = (student) => {
        setEditingStudent({
            ...student,
            password: '',
            confirmPassword: ''
        });
    }

    return (
        <div className="dashboard">
            <h1>📚 Student Management</h1>
            <p>Total Students: {students.length}</p>

            <Link to="/add" className="btn-add">➕ Add New Student</Link>

            {students.length === 0 ? (
                <p>No students yet.</p>
            ) : (
                <div className="students-grid">
                    {students.map(student => (
                        <StudentCard
                            key={student.studentId}
                            student={student}
                            onEdit={startEditing}
                            onDelete={deleteStudent}
                        />
                ))}
                </div>
            )}

            {editingStudent && (
                <div className="modal">
                    <div className="modal-content">
                        <StudentForm
                            initialData={editingStudent}
                            isEditing={true}
                            onRegister={updateStudent}
                            onCancel={() => setEditingStudent(null)}
                        />
                    </div>
                </div>
                    
            )}
        </div>
    );
}

export default Dashboard;
