require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./database');

const authRoutes = require('./routes/authRoutes');
const donorRoutes = require('./routes/donorRoutes');
const requestRoutes = require('./routes/requestRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/download-requirements', (req, res) => {
    const file = path.join(__dirname, 'Blood_Donation_Requirements.xlsx');
    res.download(file, 'Blood_Donation_Requirements.xlsx', (err) => {
        if(err) {
            console.error('Download error:', err);
            res.status(500).send('Error downloading file.');

        }
    });
});

const User = require('./models/User');
const BloodRequest = require('./models/BloodRequest');

app.get('/api/admin/stats', async (req, res) => {
    try {
        const totalDonors = await User.countDocuments({ role: 'donor'});
        const availableDonors = await User.countDocuments({ role: 'donor', is_available: true });
        const pendingRequests = await BloodRequest.countDocuments({ status: 'Pending'});
        const fullfilledRequests = await BloodRequest.countDocuments({status: 'Fulfilled' });

        res.json({ totalDonors, availableDonors, pendingRequests, fullfilledRequests});
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

app.use('/api/auth', authRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/requests', requestRoutes);

app.get('/api-status', (req, res) => {
    res.json({
        message: 'Blood Donation MongoDB API Server is running smoothly!',
        endpoints: {
            register: 'POST /api/auth/register',
            login: 'POST /api/auth/login',
            search_donors: 'GET /api/donors?blood_group=o+&city=Colombo',
            toggle_availability: 'POST /api/donors/toggle-availability',
            create_request: 'POST /api/requests',
            get_requests: 'GET /api/requests?status=Pending',
            download_excel: 'GET /download-requirements'
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server & UI is running on: http://localhost:${PORT}`);
});
module.exports = app;
