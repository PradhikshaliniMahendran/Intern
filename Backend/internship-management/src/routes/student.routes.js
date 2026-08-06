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


router.get('/:id', getStudentById);

router.put('/:id', updateStudent);

router.delete('/:id',deleteStudent);

router.get('/', getStudents);

router.post('/', addStudent);

module.exports = router;