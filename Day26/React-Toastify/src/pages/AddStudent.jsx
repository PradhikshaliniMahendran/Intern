import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentsForm from '../components/StudentForm';
import { useStudents } from '../context/StudentContext';
import { notifySuccess, notifyError } from '../services/notificationService';
import 'C:/Users/mahen/OneDrive/Desktop/Intern/Day23/student-management/src/pages/AddStudent.css';

function AddStudent() {
    const navigate = useNavigate();
    const { addStudent } = useStudents();

    const handleAdd = (newStudent) => {
        try {
            addStudent(newStudent);
            notifySuccess('Student Added Successfully');
            navigate('/students');
        } catch (err) {
            notifyError('Failed to save Student');
        }
    };

    return (
        <div className="add-student-page">
            <StudentsForm onRegister={handleAdd} isEditing={false} />
        </div>
    );
}

export default AddStudent;