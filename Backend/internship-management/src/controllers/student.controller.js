const Student = require('../models/student.model');

const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json({
            success: true,
            count: students.length,
            message: 'Students fetched successfully',
            data: students
    });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching students',
            error: error.message
        });
    }
};

const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if(!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        res.json({
            success: true,
            message: 'Student fetched successfully',
            data: student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching student',
            error: error.message
        });
    }
};

const addStudent = async (req, res) => {
    try{

    
        const { name, email, phone, course, age, status } = req.body;

        const existingStudent = await Student.findOne({ email });
        if(existingStudent) {
            return res.status(400).json({
                success: false,
                message: 'Student with this email already exists'
            });
        }
        

        const student = await Student.create({
            name,
            email,
            phone,
            course,
            age,
            status
        });

        res.status(201).json({
            success: true,
            message: 'Student Added Successfully',
            data: student
        });
    } catch (error) {
        if(error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error adding student',
            error: error.message
        });
    }
};

const updateStudent = async (req, res) => {
    try{
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        res.json({
            success: true,
            message: 'Student updated successfully',
            data: student
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error updating student',
            error: error.message
        });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: true,
                message: 'Student not found'
            });
        } 

        res.json({
            success: true,
            message: 'Student deleted successfully',
            data: student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting student',
            error: error.message
        });
    }
};

module.exports = {
    getStudents,
    addStudent,
    getStudentById,
    updateStudent,
    deleteStudent
    
};