const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

const {
    getTasks,
    addTask,
    getTaskById,
    updateTask,
    updateTaskStatus,
    deleteTask
} = require('../controllers/task.controller');

router.use(authMiddleware);

router.get('/', getTasks);

router.get('/:id', getTaskById);

router.post('/',roleMiddleware('Admin', 'Trainer'), addTask);

router.put('/:id/status', updateTaskStatus);

router.put('/:id', roleMiddleware('Admin', 'Trainer'), updateTask);

router.delete('/:id', roleMiddleware('Admin', 'Trainer'), deleteTask);

module.exports = router;