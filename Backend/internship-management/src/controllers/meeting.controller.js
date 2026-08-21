const Meeting = require('../models/meeting.model');
const Student = require('../models/student.model');

const createMeeting = async (req, res) => {
    try {
        const {
            studentId,
            meetingTitle,
            meetingDate,
            meetingTime,
            meetingType,
            meetingLink,
            status
        } = req.body;

        if (!studentId || !meetingTitle || !meetingDate || !meetingTime || !meetingType) {
            return res.status(400).json({
                success: false,
                message: 'Please provide studentId, meetingTitle, meetingDate, meetingTime and meetingType'
            });
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        const meeting = await Meeting.create({
            studentId,
            meetingTitle,
            meetingDate,
            meetingTime,
            meetingType,
            meetingLink,
            status: status || 'Scheduled'
        });

        res.status(201).json({
            success: true,
            message: 'Meeting created successfully',
            data: meeting
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
            message: 'Error creating meeting',
            error: error.message
        });
    }
};

const getAllMeetings = async (req, res) => {
    try{
        let query ={};

        if (req.user.role === 'Student') {
            const student = await Student.findOne({ email: req.user.email });
            if (student) {
                query.studentId = student._id;
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'Student profile not found'
                });
            }
        }

        const meetings = await Meeting.find(query)
        .populate('studentId', 'name email course')
        .sort({ meetingDate: -1 });

        res.status(200).json({
            success: true,
            count: meetings.length,
            message: 'Meetings fetched successfully',
            data: meetings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching meetings',
            error: error.message
        });
    }
};

const getMeetingById = async (req, res) => {
    try {
        const meeting = await Meeting.findById(req.params.id)
        .populate('studentId', 'name email course');

        if (!meeting) {
            return res.status(404).json({
                success: false,
                message: 'Meeting not found'
            });
        }

        if (req.user.role === 'Student') {
            const student = await Student.findOne({ email: req.user.email });
            if (meeting.studentId._id.toString() !== student._id.toString()) {
                return res.status(403).json({
                    success: false,
                    message: 'Access denied. You can only view your own meetings.'
                });
            }
        }

        res.status(200).json({
            success: true,
            message: 'Meeting fetched successfully',
            data: meeting
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching meeting',
            error: error.message
        });
    }
};

const updateMeeting = async (req, res) => {
    try {
        const meeting = await Meeting.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate('studentId', 'name email course');

        if (!meeting) {
            return res.status(404).json({
                success: false,
                message: 'Meeting not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Meeting updated successfully',
            data: meeting
        });
    } catch (error) {
        if (error.name === 'Validation Error') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error updating meeting',
            error: error.message
        });
    }
};

const deleteMeeting = async (req, res) => {
    try {
        const meeting = await Meeting.findByIdAndDelete(req.params.id);

        if (!meeting) {
            return res.status(404).json({
                success: false,
                message: 'Meeting not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Meeting deleted successfully',
            data: meeting
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting meeting',
            error: error.message
        });
    }
};

const getMeetingsByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        const meetings = await Meeting.find({ studentId })
            .populate('studentId', 'name email course')
            .sort({ meetingDate: -1});

        if (!meetings || meetings.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No meetings found for this student'
            });
        }

        res.status(200).json({
            success: true,
            count: meetings.length,
            message: 'Meetings fetced successfully',
            data: meetings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching meetings',
            error: error.message
        });
    }
};

module.exports = {
    createMeeting,
    getAllMeetings,
    getMeetingById,
    updateMeeting,
    deleteMeeting,
    getMeetingsByStudent
};