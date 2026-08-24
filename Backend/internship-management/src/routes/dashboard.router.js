const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const { getDashboard} = require('../controllers/dashboard.controller');

router.get(
    '/',
    authMiddleware,
    roleMiddleware('Admin', 'Trainer'),
    getDashboard
);

module.exports = router;