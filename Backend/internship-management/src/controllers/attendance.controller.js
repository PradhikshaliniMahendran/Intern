const Attendance = require('../models/attendance.model');
const Student = require('../models/student.model');

const checkIn = async (req, res) => {
    try {
        const { studentId } = req.body;

        if (!studentId) {
            return res.status(400).json({
                success:false,
                message: 'Student ID is required'
            });
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        const today = new Date();
        today.setHours(0,0,0,0);

        const existingAttendance = await Attendance.findOne({
            studentId: studentId,
            date: {
                $gte: today,
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
            }
        });

        if (existingAttendance) {
            return res.status(400).json({
                success: false,
                message: 'Student already checked in today',
                
            });
        }
    

        const now = new Date();
        const checkInTime = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });

        const hours = now.getHours();
        const minutes = now.getMinutes();
        const status = (hours > 9 || (hours === 9 && minutes > 0)) ? 'Late' : 'Present';

        const attendance = await Attendance.create({
            studentId,
            date: now,
            checkIn: checkInTime,
            status
        });

        res.status(201).json({
            success: true,
            message: 'Check-in successful',
            data: {
                student: student.name,
                checkIn: attendance.checkIn,
                status: attendance.status,
                date: attendance.date
            }
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Student already checked in today'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error checking in',
            error: error.message
        });

    }
};

const checkOut = async (req, res) => {
    try {
        const { studentId } = req.body;

        if (!studentId) {
            return res.status(400).json({
                success:false,
                message: 'Student ID is required'
            });
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        const today = new Date();
        today.setHours(0,0,0,0);

        const attendance = await Attendance.findOne({
            studentId: studentId,
            date: {
                $gte: today,
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
            }
        });

        if (!attendance) {
            return res.status(400).json({
                success: false,
                message: 'No check-in record found for today',
                
            });
        }

        if (attendance.checkOut) {
            return res.status(400).json({
                success: false,
                message: 'Student already checked out today'
            });
        }
    

        const now = new Date();
        const checkOutTime = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });

        attendance.checkOut = checkOutTime;
        await attendance.save();

        res.status(200).json({
            success: true,
            message: 'Check-out successful',
            data: {
                student: student.name,
                checkIn: attendance.checkIn,
                checkOut: attendance.checkOut,
                status: attendance.status,
                date: attendance.date
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error checking out',
            error: error.message
        });
    }

};

const getAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find()
        .populate('studentId', 'name email course')
        .sort({ date: -1});

        res.status(200).json({
            success: true,
            count: attendance.length,
            message: 'Attendance records fetched successfully',
            data: attendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching attendance records',
            error: error.message
        });
    }
};

const getAttendanceByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        const attendance = await Attendance.find({ studentId })
        .populate('studentId', 'name email course')
        .sort({ date: -1});

        if ( !attendance || attendance.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No attendance records found for this student'
            });
        }

        res.status(200).json({
            success: true,
            count: attendance.length,
            message: 'Attendance records fetched successfully',
            data: attendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching attendance records',
            error: error.message
        });
    
    }
};

module.exports = {
    checkIn,
    checkOut,
    getAttendance,
    getAttendanceByStudent
};


