const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blood_donation';
        const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected: ${conn.connection.host} / ${conn.connection.name}`);

    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        console.log(`Tip: Make sure MongoDB is running locally or provide MONGODB_URI in .env file.`);
    }
}

module.exports = connectDB;