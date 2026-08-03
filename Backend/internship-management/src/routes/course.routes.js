const express = require('express');
const router = express.Router();
const {
    getCourses,
    addCourse,
    getCourseById,
    updateCourse,
    deleteCourse
} = require('../controllers/course.controller');

router.get('/', getCourses);

router.get('/:id', getCourseById);

router.post('/', addCourse);

router.put('/:id', updateCourse);

router.delete('/', deleteCourse);

module.exports = router;