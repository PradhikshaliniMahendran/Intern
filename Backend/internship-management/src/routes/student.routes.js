const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const {
    getStudents,
    addStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
    testError
} = require('../controllers/student.controller');

router.get('/', authMiddleware, getStudents);

router.get('/:id',authMiddleware, getStudentById);

router.post('/', authMiddleware, roleMiddleware('Admin', 'Trainer'),addStudent);

router.put('/:id',authMiddleware,roleMiddleware('Admin', 'Trainer'), updateStudent);

router.delete('/:id', authMiddleware, roleMiddleware('Admin'), deleteStudent);


module.exports = router;