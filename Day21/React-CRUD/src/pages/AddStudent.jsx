import React from 'react';
import { useNavigate } from 'react-router-dom';

import StudentForm from 'C:/Users/mahen/OneDrive/Desktop/Intern/Day16/React-form/src/components/StudentForm';

import useLocalStorage from '../hooks/useLocalStorage';

import './AddStudent.css';

function AddStudent() {
    const navigate = useNavigate();
    const [students, setStudents] = useLocalStorage('students', []);

    const handleAdd = (newStudent) => {
        const studentWithId = {
            ...newStudent,
            studentId: newStudent.studentId || Date.now().toString()
        };
        setStudents([...students, studentWithId]);
        navigate('/');
    };

    return (
        <div className="add-student-page">
            <StudentForm onRegister={handleAdd} isEditing={false} />
        </div>
    );
}

export default AddStudent;