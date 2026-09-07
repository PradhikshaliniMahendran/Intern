const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, email, password, phone, blood_group, city} = req.body;
        const newDonor = await User.create({ name, email, password_hash: password || '12345', phone, blood_group, city, role: 'donor' });
        res.status(201).json({ message: 'Donor created successfully', donor: newDonor });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req,res) => {
    try {
        const { blood_group, city } = req.query;
        const query = { role: 'donor'};

        if (blood_group) query.blood_group = blood_group;
        if (city) query.city = { $regex: city, $options: 'i'};

        const donors = await User.find(query).select('-password_hash').sort({ is_available: -1, createdAt: -1 });
        res.json({ count: donors.length, donors });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/toggle-availability', async (req, res) => {
    try {
        const { userId, is_available } = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, { is_available: Boolean(is_available)}, { new: true });
        res.json({ message: 'Availability status updated successfully!', is_available: updatedUser.is_available});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ error: 'Donor not found'});
        res.json({ message: 'Donor profile deleted successfully!', id: req.params.id});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;