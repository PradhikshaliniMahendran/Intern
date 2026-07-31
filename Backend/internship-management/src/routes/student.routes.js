const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    router.json({
        message: 'Student Route Working Successfully'
    });
});

router.get('/:id', (req, res) => {
    const studentId = req.params.id;
    res.json({
        message: `Student Route Working Successfully`,
        studentId: studentId
    });
});

module.exports = router;