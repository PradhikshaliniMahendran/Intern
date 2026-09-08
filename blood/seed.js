require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./database');
const User = require('./models/User');
const BloodRequest = require('./models/BloodRequest');

const seedAdminOnly = async () => {
    await connectDB ();

    console.log('Clearing old sample data and initializing essential Admin user...');

    try {
        await User.deleteMany({});
        await BloodRequest.deleteMany({});

        const salt = bcrypt.genSaltSync(10);
        const adminPass = bcrypt.hashSync('admin123', salt);

        await User.create({
            name: 'Admin LifeDrop',
            email: 'admin@lifedrop.com',
            password_hash: adminPass,
            phone: '0741567890',
            blood_group: 'A+',
            city: 'Colombo',
            role: 'admin',
            is_available: true
        });

        console.log('Clean database initialized! only essential Admin(admin@lifedrop.com) created.')
    } catch (err) {
        console.error('Initialization error:', err.message);

    } finally {
        mongoose.connection.close();
    }
};

seedAdminOnly();
