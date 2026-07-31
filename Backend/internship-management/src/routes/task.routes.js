const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    router.json({
        message: 'Task Route Working Successfully'
    });
});

router.get('/:id', (req, res) => {
    const taskId = req.params.id;
    res.json({
        message: `Task Route Working Successfully`,
        taskId: taskId
    });
});

module.exports = router;