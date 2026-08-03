const getTrainers = (req, res) => {
    res.json({
        success: true,
        message: 'Trainers fetched successfully',
        data: [
            {id: 1, name: 'Mr. Kumar', expertise: 'Web Development'},
            {id: 2, name: 'Ms. Priya', expertise: 'Data Science'},
        ]
    });
};

const addTrainer = (req, res) => {
    const { name, expertise} = req.body;

    if (!name || !expertise) {
        return res.status(400).json({
            success: false,
            message: 'Name and expertise wre required'
        });
    }

    res({
        success: true,
        message: 'Trainer Added Successfully',
        data: { id: 3, name, course }
    });
};

const getTrainerById = (req, res) => {
    const { id } = req.params;
    res.json({
        success: true,
        message: `Trainer with ID ${id} fetched seccessfully`,
        data: { id, name: 'Mr. Kumar', course: 'Web Development'}
    });
};

const updateTrainer = (req, res) => {
    const { id } = req.params;
    const { name, expertise } = req.body;

    res.json({
        success: true,
        message: `Trainer with ID ${id} updated successfully`,
        data: { id, name, expertise }
    });
};

const deleteTrainer = (req, res) => {
    const { id } = req.params;
    res.json({
        success: true,
        message: `Trainer with ID ${id} deleted successfully`
    });
};

module.exports = {
    getTrainers,
    addTrainer,
    getTrainerById,
    updateTrainer,
    deleteTrainer
};