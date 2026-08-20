const Task = require('../models/task.model');
const Student = require('../models/student.model');

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
        .populate('assignedTo', 'name email course')
        .sort({ createdAt: -1 });

        res.status(200).json({
        success: true,
        count: tasks.length,
        message: 'Tasks fetched successfully',
        data: tasks

    });
    
    
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching tasks',
            error: error.message
        });
    }
};

const addTask = async (req, res) => {
    try {
        const { title, description, assignedTo, deadline, priority, status } = req.body;

        if (!title || !description || !assignedTo || !deadline) {
            return res.status(400).json({
                success: false,
                message: 'Please provide title, description, assignedTo and deadline'
            });
    
        }

        const student = await Student.findById(assignedTo);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        const task = await Task.create({
            title,
            description,
            assignedTo,
            deadline,
            priority: priority || 'Medium',
            status: status || 'Pending'
        });

        res.status(201).json({
            success: true,
            message: 'Task Added Successfully',
            data: task
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
        return res.status(500).json({
            success: false,
            message: 'Error adding Task',
            error: error.message
        });

    }
};

const getTaskById = async (req, res) => {
    try{
        const task = await Task.findById(req.params.id)
            .populate('assignedTo', 'name email course');

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Task  fetched seccessfully',
            data: task
        });
    } catch (error) {
        res.status(500).json ({
            success: false,
            message: 'Error fetching task',
            error: error.message
        });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        .populate('assignedTo', 'name email course');

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(200).json({
            success: true,
            message: `Task updated successfully`,
            data: task
        });
    } catch (error) {
        if (errors.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error updating task',
            error: error.message
        });
    }
};

const updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(404).json({
                success: false,
                message: 'Status is required'
            });
        }

        const validStatuses = ['Pending', 'In Progress', 'Completed'];
        if(!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Allowed: Pending, In Progress, Completed'
            });
        }

        const task = await Task.findById(req.params.id)
            .populate('assignedTo', 'name email course');

            if (!task) {
                return res.status(404).json({
                    success: false,
                    message: 'Task not found'
                });
            }

            if (req.user.role === 'Student') {
                const student = await Student.findOne({ email: req.user.email });
                if (task.assignedTo._id.toString() !== student._id.toString()) {
                    return res.status(403).json({
                        success: false,
                        message: 'Access denied.you can only update your own tasks.'
                    });
                }
            }

            task.status = status;
            await task.save();

            res.status(200).json({
                success: true,
                message: 'Task status updated successfully',
                data: task
            });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating task status',
            error: error.message
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            data: task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting task',
            error: error.message
        });
    }
};

module.exports = {
    getTasks,
    addTask,
    getTaskById,
    updateTask,
    updateTaskStatus,
    deleteTask
};