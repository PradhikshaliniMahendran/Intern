const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: [true, 'Student ID is required']
        },

        date: {
            type: Date,
            required: [true, 'Date is required'],
            default: Date.now
        },

        checkIn: {
            type: String,
            required: [true, 'Check-in time is required'],
        },

        checkOut: {
            type: String,
            default: null
        },

        status: {
            type: String,
            enum: ['Present', 'Absent', 'Late'],
            default: 'Present'
        }
    },

        {
            timestamps: true
        }
    
);

attendanceSchema.index({ studentId: 1, date: 1 }, { unique:true });

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;

