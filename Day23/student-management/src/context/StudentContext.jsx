import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const StudentContext = createContext();

export function StudentProvider({ children }) {
    const [students, setStudents ] = useLocalStorage('students', [
        {
            studentId: "STU001",
            fullName: "Pradhikshalini",
            email: "mahendranpradhikshalini@gmail.com",
            phone: "0702345678",
            course: "ReactJS",
            batch: "Batch 01",
            gender: "Female",
            address: "123 Galle Road, colombo",
            imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150",
            status: "Active",
            attendance: {present: 12, absent: 2}
        },
        {
            studentId: "STU001",
            fullName: "Pradhikshalini",
            email: "mahendranpradhikshalini@gmail.com",
            phone: "0702345678",
            course: "ReactJS",
            batch: "Batch 01",
            gender: "Female",
            address: "123 Galle Road, colombo",
            imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150",
            status: "Active",
            attendance: {present: 12, absent: 2}
        },
        {
            studentId: "STU001",
            fullName: "Pradhikshalini",
            email: "mahendranpradhikshalini@gmail.com",
            phone: "0702345678",
            course: "ReactJS",
            batch: "Batch 01",
            gender: "Female",
            address: "123 Galle Road, colombo",
            imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150",
            status: "Active",
            attendance: {present: 12, absent: 2}
        }
    ]);

    const addStudent = (newStudent) => {
        const studentWithId = {
            ...newStudent,
            studentId: newStudent.studentId || "STU" + Date.now().toString().slice(-6),
            attendance: { present: 0, absent: 0 }
        };
        setStudents([...students, studentWithId]);
    };

    const updateStudent = (updatedStudent) => {
        setStudents(students.map(s => s.studentId === updatedStudent.studentId ? updatedStudent : s));
    };

    const deleteStudent = (studentId) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            setStudents(students.filter(s => s.studentId !== studentId));
        }
    };

    const logAttendance = (studentId, isPresent) => {
        setStudents(students.map(s => {
            if (s.studentId === studentId) {
                const current = s.attendance || { present: 0, absent: 0};
                return {
                    ...s,
                    attendance:  {
                        present: isPresent ? current.present + 1 : current.present,
                        absent: !isPresent ? current.absent + 1 : current.absent,
                    }
                };
            }
            return s;
        }));
    };

    return (
        <StudentContext.Provider value={{ students, addStudent, updateStudent, deleteStudent, logAttendance}}>
            {children}
        </StudentContext.Provider>
    );
}

export function useStudents() {
    const context = useContext(StudentContext);
    if (!context) {
        throw new Error('useStudents must be used within a StudentProvider');
    }
    return context;
}

export default StudentContext;
