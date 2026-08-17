const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const {
    getStudents,
    addStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
    testError
} = require('../controllers/student.controller');


router.get('/:id',authMiddleware, getStudentById);

router.put('/:id',authMiddleware, updateStudent);

router.delete('/:id', authMiddleware, deleteStudent);

router.get('/', authMiddleware, getStudents);

router.post('/', authMiddleware, addStudent);

module.exports = router;