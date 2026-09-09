const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    blood_group: { type: String, required: true, enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']},
    password_hash: { type:String, required: true},
    phone: { type: String, required: true},
    city: { type: String, required: true, trim: true},
    age: { type: Number },
    gender: { type: String },
    last_donation_date: { type: Date },
    is_available: { type: Boolean, default: true },
    role: { type: String, enum: ['donor', 'recipent', 'admin'], default: 'donor'}
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);