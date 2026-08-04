const express = require('express');
const router = express.Router();
const {
    getStudents,
    addStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
    testError
} = require('../controllers/student.controller');

router.get('/test-error', testError);

router.get('/', getStudents);

router.get('/:id', getStudentById);

router.post('/', addStudent);

router.put('/:id', updateStudent);

router.delete('/', deleteStudent);

module.exports = router;