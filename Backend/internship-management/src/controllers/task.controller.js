const getTasks = (req, res) => {
    res.json({
        success: true,
        message: 'Tasks fetched successfully',
        data: [
            {id: 1, title: 'Complete Project', status: 'Pending'},
            {id: 2, title: 'Submit Report', status: 'Completed'},
        ]
    });
};

const addTask = (req, res) => {
    const { title, status } = req.body;

    if (!title || !status) {
        return res.status(400).json({
            success: false,
            message: 'Title and Status are required'
        });
    }

    res.json({
        success: true,
        message: 'Task Added Successfully',
        data: { id: 3, title, status }
    });
};

const getTaskById = (req, res) => {
    const { id } = req.params;
    res.json({
        success: true,
        message: `Task with ID ${id} fetched seccessfully`,
        data: { id, title: 'Complete Project', status: 'Pending'}
    });
};

const updateTask = (req, res) => {
    const { id } = req.params;
    const { title, status} = req.body;

    res.json({
        success: true,
        message: `Task with ID ${id} updated successfully`,
        data: { id, title, status }
    });
};

const deleteTask = (req, res) => {
    const { id } = req.params;
    res.json({
        success: true,
        message: `Task with ID ${id} deleted successfully`
    });
};

module.exports = {
    getTasks,
    addTask,
    getTaskById,
    updateTask,
    deleteTask
};