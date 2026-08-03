const express = require('express');
const router = express.Router();
const {
    getTrainers,
    addTrainer,
    getTrainerById,
    updateTrainer,
    deleteTrainer
} = require('../controllers/trainer.controller');

router.get('/', getTrainers);

router.get('/:id', getTrainerById);

router.post('/', addTrainer);

router.put('/:id', updateTrainer);

router.delete('/', deleteTrainer);

module.exports = router;