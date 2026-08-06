const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Student name is required'],
            trim: true,
            minlength: [2, 'Nme must be atleast 2 characters long'],
            maxlength: [50, 'Name cannot exceed 50 characters']
        },

        email: {
            type: String,
            required: [true, 'Email address is required'],
            unique:true,
            lowercase: true,
            trim: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    'Please provide a valid email address'
            ]
        },

        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
            minlength: [10, 'Phone number must be atleast 10 digits'],
            maxlength: [15, 'Phone number cannot exceed 15 digits']
        },

        course: {
            type: String,
            required: [true, 'Course name is required'],
            trim: true,
            enum: {
                values: ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Data Science', 'MERN Stack'],
                message: '{VALUE} is not a valid course'
            }
        },

        age: {
            type: Number,
            required: [true, 'Age is required'],
            min: [16, 'Age must be at least 16'],
            max: [60, 'Age cannot exceed 60']
        },

        status: {
            type: String,
            enum: ['Active', 'Inactive', 'Graduated', 'Suspended'],
            default: 'Active'
        }
    },
    {
        timestamps: true
    }
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;