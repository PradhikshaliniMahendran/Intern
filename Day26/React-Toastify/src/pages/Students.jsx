import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StudentCard from '../components/StudentCard';
import StudentFrom from '../components/StudentForm';
import { useStudents } from '../context/StudentContext';
import { notifySuccess, notifyError } from '../services/notificationService';
import { confirmDelete } from '../utils/alerts';
import 'C:/Users/mahen/OneDrive/Desktop/Intern/Day23/student-management/src/pages/Students.css';

function Students() {
    const { students, updateStudent, deleteStudent } = useStudents();
    const [editingStudent, setEditingStudent] = useState(null);

    const handleDelete = async (studentId) => {
        const student = students.find(s => s.studentId === studentId);
        const confirmed = await confirmDelete(student?.fullName || 'this-student');
        if (confirmed) {
            try {
                deleteStudent(studentId, true);
                notifySuccess('Student Deleted Successfully!');
            } catch (err) {
                notifyError('Failed to Delete Student!');
            }
        }
    };

    const startEditing = (student) => {
        setEditingStudent({...student, password: '', confirmPassword: ''});
    };

    const handleUpdate = (updatedStudent) => {
        try {
            const { password, confirmPassword, ...studentData} = updatedStudent;
            updateStudent(studentData);
            setEditingStudent(null);
            notifySuccess('Student Updated SuccessFully!');
        } catch (err) {
            notifyError('Failed to Update Student!');
        }
    };

    return (
        <div className="students-page">
            <div className="students-header">
                <h1>📚 Student Management</h1>
                <p>Total Students: <strong>{students.length}</strong></p>
                <Link to="/add-student" className="➕">Add New Student</Link>
            </div>

            {students.length === 0 ? (
                <p className="no-students">No students registered yet.</p>
            ) : (
                <div className="students-grid">
                    {students.map((student) => (
                        <StudentCard
                            key={student.studentId}
                            student={student}
                            onEdit={startEditing}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            {editingStudent && (
                <div className="modal" onClick={() => setEditingStudent(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <StudentFrom
                            initialData={editingStudent}
                            isEdithing={true}
                            onRegister={handleUpdate}
                            onCancel={() => setEditingStudent(null)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Students;