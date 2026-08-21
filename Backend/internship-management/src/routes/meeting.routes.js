const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const {
    createMeeting,
    getAllMeetings,
    getMeetingById,
    updateMeeting,
    deleteMeeting,
    getMeetingsByStudent
} = require('../controllers/meeting.controller');

router.use(authMiddleware);

router.get('/', getAllMeetings);

router.get('/:id', getMeetingById);

router.get('/student/:studentId', getMeetingsByStudent);

router.post('/', roleMiddleware('Admin', 'Trainer'), createMeeting);

router.put('/:id', roleMiddleware('Admin', 'Trainer'), updateMeeting);

router.delete('/:id', roleMiddleware('Admin', 'Trainer'), deleteMeeting);

module.exports = router;