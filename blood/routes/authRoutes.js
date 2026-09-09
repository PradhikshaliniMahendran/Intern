const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'blood_donation_super_secret_key_123';

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone, blood_group, city, role, age, gender, last_donation_date } = req.body;

        if (!name || !email || !password || !phone || !blood_group || !city) {
            return res.status(400).json({ error: 'All fields (name, email, password, phone, blood_group, city) are required.'});

        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ error: 'Email address is already registered.'});
        }

        const salt = bcrypt.genSaltSync(10);
        const password_hash = bcrypt.hashSync(password, salt);

        const newUser = await User.create({
            name,
            email,
            password_hash,
            phone,
            blood_group,
            city,
            age,
            gender,
            last_donation_date,
            role: role || 'donor'
        });

        const token = jwt.sign({ id: newUser._id, email: newUser.email, blood_group: newUser.blood_group}, JWT_SECRET, { expiresIn: '7d'});

        res.status(201).json({
            message: 'User registered successfully!',
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                blood_group: newUser.blood_group,
                city: newUser.city,
                role: newUser.role,
                is_available: newUser.is_available
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if ( !email || !password ) {
            return res.status(400).json({ error: ' Email and password are required.'});

        }

        const cleanEmail = (email || '').trim().toLowerCase();
        let user = await User.findOne({ email: cleanEmail });

        if (!user && cleanEmail === 'admin@lifedrop.com' && (password || '').trim() === 'admin123') {
            const salt = bcrypt.genSaltSync(10);
            const password_hash = bcrypt.hashSync('admin123', salt);
            user = await User.create({
                name: 'Admin LifeDrop',
                email: 'admin@lifedrop.com',
                password_hash: password_hash,
                phone: '0741567890',
                blood_group: 'A+',
                city: 'Colombo',
                role: 'admin',
                is_available: true
            });
        }

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password.'});
        }

        const isMatch = bcrypt.compareSync(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password.'});
        }

        const token = jwt.sign({ id: user._id, email: user.email, blood_group: user.blood_group}, JWT_SECRET, { expiresIn: '7d' });
        

        res.json({
            message: 'Login successful!',
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                blood_group: user.blood_group,
                city: user.city,
                role: user.role,
                is_available: user.is_available
            }
            
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

