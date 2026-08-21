const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: [true, 'Student ID is required']
        },

        meetingTitle: {
            type: String,
            required: [true, 'Meeting title is required'],
            trim: true,
            minlength: [3, 'Title must at least 3 characters'],
            maxlength: [100, 'Title cannot exceed 100 characters']
        },

        meetingDate: {
            type: Date,
            required: [true, 'Meeting date is required']
        },

        meetingTime: {
            type: String,
            required: [true, 'Meeting time is required']
        },

        meetingType: {
            type: String,
            enum: ['Online', 'Offline'],
            required: [true, 'Meeting type is required']
        },

        meetingLink: {
            type: String,
            trim: true,
            validate: {
                validator: function(value) {
                    if (this.meetingType === 'Online' && !value) {
                        return false;
                    }
                    return true;
                },
                message: 'Meeting link is required for online meetings'
            }
        },

        status: {
            type: String,
            enum: ['Scheduled', 'Completed', 'Cancelled'],
            default: 'Scheduled'
        }
    },
    {
        timestamps: true
    }
);

meetingSchema.index({ studentId: 1, meetingDate: 1 });

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;