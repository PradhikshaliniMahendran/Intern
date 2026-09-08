const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema({
    patient_name: { type: String, required: true, trim: true },
    blood_group: { type: String, required: true, enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']},
    units_needed: { type:Number, default: 1},
    hospital_name: { type: String, required: true, trim: true},
    city: { type: String, required: true, trim: true},
    contact_number: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Fulfilled', 'Cancelled'], default: 'Pending'},
    assigned_volunteer: { type: String, default: 'Unassigned'}
}, {
    timestamps: true
});

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);