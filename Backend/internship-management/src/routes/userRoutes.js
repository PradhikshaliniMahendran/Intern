const express = require('express');
const router = express.Router();
const {
    getUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController');
const { addTask } = require('../controllers/task.controller');

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/', addUser);

router.put('/:id', updateUser);

router.delete('/', deleteUser);

module.exports = router;