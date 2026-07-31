const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    router.json({
        message: 'Course Route Working Successfully'
    });
});

router.get('/:id', (req, res) => {
    const coursetId = req.params.id;
    res.json({
        message: `Course Route Working Successfully`,
        coursetId: coursetId
    });
});

module.exports = router;