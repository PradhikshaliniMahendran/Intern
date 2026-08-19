const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const {
    checkIn,
    checkOut,
    getAttendance,
    getAttendanceByStudent
} = require('../controllers/attendance.controller');

router.use(authMiddleware);

router.post('/checkin', checkIn);
router.post('/checkout', checkOut);
router.get('/', getAttendance);
router.get('/student/:studentId', getAttendanceByStudent);

module.exports = router;
