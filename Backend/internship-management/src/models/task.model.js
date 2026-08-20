const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Task title is required'],
            trim: true,
            minlength: [3, 'Title must be atleast 3 characters'],
            maxlength: [100, 'Title cannot exceed 100 characters']
        },

        description: {
            type: String,
            required: [true, 'Task description is required'],
            trim: true,
            maxlength: [500, 'Descripton cannot exceed 500 characters']
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: [true, 'Student assignment is required'],
        },

        deadline: {
            type: Date,
            required: [true, 'Deadline is required']
        },

        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High'],
            default: 'Medium'
        },

        status: {
            type: String,
            enum: ['Pending', 'In Progress', 'Completed'],
            default: 'Pending'
        }
    },

        {
            timestamps: true
        }
    
);

taskSchema.index({ assignedTo: 1, deadline: 1 });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

