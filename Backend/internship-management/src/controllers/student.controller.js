const getStudents = (req, res) => {
    res.json({
        success: true,
        message: 'Students fetched successfully',
        data: [
            {id: 1, name: 'John Doe', course: 'Computer Science'},
            {id: 2, name: 'Jane Smith', course: 'Mathematics'},
        ]
    });
};

const addStudent = (req, res) => {
    const { name, course } = req.body;

    if (!name || !course) {
        return res.status(400).json({
            success: false,
            message: 'Name and course are required'
        });
    }

    res.json({
        success: true,
        message: 'Student Added Successfully',
        data: { id: 3, name, course }
    });
};

const getStudentById = (req, res) => {
    const { id } = req.params;
    res.json({
        success: true,
        message: `Student with ID ${id} fetched seccessfully`,
        data: { id, name: 'John Doe', course: 'Computer Science'}
    });
};

const updateStudent = (req, res) => {
    const { id } = req.params;
    const { name, course } = req.body;

    res.json({
        success: true,
        message: `Student with ID ${id} updated successfully`,
        data: { id, name, course }
    });
};

const deleteStudent = (req, res) => {
    const { id } = req.params;
    res.json({
        success: true,
        message: `Student with ID ${id} deleted successfully`
    });
};

module.exports = {
    getStudents,
    addStudent,
    getStudentById,
    updateStudent,
    deleteStudent
};