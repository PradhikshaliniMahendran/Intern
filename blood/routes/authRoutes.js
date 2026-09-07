const expess = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = expess.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'blood_donation_super_secret_key_123';

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone, blood_group, city, role} = req.body;

        if (!name || !email || !password || !phone || !blood_group || !city) {
            return res.status(400).json({ error: 'All fields (name, email, password, phone, blood_group, city) are required.'});

        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.satus(400).json({ error: 'Email address is already registered.'});
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

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.satus(400).json({ error: 'Invalid email or password.'});
        }

        const isMatch = bcrypt.compareSync(password, user.password_hash);
        if (!isMatch) {
            return res.satus(400).json({ error: 'Invalid email or password.'});
        }

        const token = jwt.sign({ id: user._id, email: user.email, blood_group: user.blood_group}, JWT_SECRET, { expiresIn: '7d' });
        

        re.json({
            message: 'Login successful!',
            token,
            user:{
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

module.exports = router;

