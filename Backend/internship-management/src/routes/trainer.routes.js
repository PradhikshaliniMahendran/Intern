const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    router.json({
        message: 'Trainer Route Working Successfully'
    });
});

router.get('/:id', (req, res) => {
    const trainertId = req.params.id;
    res.json({
        message: `Trainer Route Working Successfully`,
        trainerId: trainerId
    });
});

module.exports = router;