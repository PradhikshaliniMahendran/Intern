const getUsers = (req, res) => {
    res.json({
        success: true,
        message: 'Users fetched successfully',
        data: [
            {id: 1, name: 'Admin User', email: 'admin@example.com'},
            {id: 2, name: 'Test User', email: 'test@example.com'},
        ]
    });
};

const addUser = (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: 'Name and email are required'
        });
    }

    res.json({
        success: true,
        message: 'User Added Successfully',
        data: { id: 3, name, email }
    });
};

const getUserById = (req, res) => {
    const { id } = req.params;
    res.json({
        success: true,
        message: `User with ID ${id} fetched seccessfully`,
        data: { id, name: 'Admin User', email: 'admin@example.com'}
    });
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    res.json({
        success: true,
        message: `User with ID ${id} updated successfully`,
        data: { id, name, email }
    });
};

const deleteUser = (req, res) => {
    const { id } = req.params;
    res.json({
        success: true,
        message: `User with ID ${id} deleted successfully`
    });
};

module.exports = {
    getUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUser
};