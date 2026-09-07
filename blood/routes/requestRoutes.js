const express = require('express');
const BloodRequest = require('../models/BloodRequest');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { patient_name, blood_group, units_needed, hospital_name, city, contact_number} = req.body;
        const newRequest = await BloodRequest.create({ 
            patient_name, 
            blood_group, 
            units_needed: units_needed || 1, 
            hospital_name, 
            city, 
            contact_number
        });
        res.status(201).json({ message: 'Blood Request submitted successfully', request_id: newRequest._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req,res) => {
    try {
        const { blood_group, city, status } = req.query;
        const query = {};

        if (blood_group) query.blood_group = blood_group;
        if (city) query.city = { $regex: city, $options: 'i'};
        if (status) query.status = status;

        const requests = await BloodRequest.find(query).sort({ createdAt: -1 });
        res.json({ count: requests.length, requests });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedRequest = await BloodRequest.findByIdAndUpdate(id, { status }, { new: true });
        res.json({ message: 'Request status updated successfully!', request_id: id, status: updatedRequest.status });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedReq = await BloodRequest.findByIdAndDelete(req.params.id);
        if (!deletedReq) return res.status(404).json({ error: 'Request not found'});
        res.json({ message: 'Blood Request deleted successfully!', id: req.params.id});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;