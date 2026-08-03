const express = require('express');
const router = express.Router();
const {
    getTasks,
    addTask,
    getTaskById,
    updateTask,
    deleteTask
} = require('../controllers/task.controller');

router.get('/', getTasks);

router.get('/:id', getTaskById);

router.post('/', addTask);

router.put('/:id', updateTask);

router.delete('/', deleteTask);

module.exports = router;