const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const seedAdminIfMissing = async () => {
    try {
        const User = require('./models/User');
        const adminExists = await User.findOne({ email: 'admin@lifedrop.com' });
        if (!adminExists) {
            const salt = bcrypt.genSaltSync(10);
            const password_hash = bcrypt.hashSync('admin123', salt);
            await User.create({
                name: 'Admin LifeDrop',
                email: 'admin@lifedrop.com',
                password_hash: password_hash,
                phone: '0741567890',
                blood_group: 'A+',
                city: 'Colombo',
                role: 'admin',
                is_available: true
            });
            console.log('✅ Admin User initialized: admin@lifedrop.com / admin123');
        }
    } catch (err) {
        console.error('Admin auto-seed error:', err.message);
    }
};

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blood_donation';
        const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected: ${conn.connection.host} / ${conn.connection.name}`);
        await seedAdminIfMissing();

    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        console.log(`Tip: Make sure MongoDB is running locally or provide MONGODB_URI in .env file.`);
    }
}

module.exports = connectDB;