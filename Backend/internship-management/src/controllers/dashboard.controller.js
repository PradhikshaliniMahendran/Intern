const Student = require('../models/student.model');
const Attendance = require('../models/attendance.model');
const Task = require('../models/task.model');
const Meeting = require('../models/meeting.model');

const getDashboard = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0,0,0,0);
        const tomorrow =new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const totalStudents = await Student.countDocuments();

        const activeStudents = await Student.countDocuments({ status: 'Active' });

        const todayAttendance = await Attendance.countDocuments({
            date: {
                $gte: today,
                $lt: tomorrow
            }
        });

        const pendingTasks = await Task.countDocuments({ status: 'Pending' });

        const completedTasks = await Task.countDocuments({ status: 'Completed' });

        const todayMeetings = await Meeting.countDocuments({
            meetingDate: {
                $gte: today,
                $lt: tomorrow
            }
        });

        res.status(200).json({
            success: true,
            message: 'Dashboard data fetched successfully',
            data: {
                totalStudents,
                activeStudents,
                todayAttendance,
                pendingTasks,
                completedTasks,
                todayMeetings,

                details: {
                    attendance: totalStudents > 0 ?
                        Math.round((todayAttendance / totalStudents) * 100) : 0,
                    taskCompletionRate: (pendingTasks + completedTasks) > 0 ?
                        Math.round((completedTasks / (pendingTasks + completedTasks)) * 100) : 0
                }
            }
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard data',
            error: error.message
        });
    }
};

module.exports = {
    getDashboard
};