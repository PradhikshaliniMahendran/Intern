const getCourses = (req, res) => {
    res.json({
        success: true,
        message: 'Courses fetched successfully',
        data: [
            {id: 1, name: 'Computer Science', duration: '4 years'},
            {id: 2, name: 'Mathematics', duration: '3 years'},
        ]
    });
};

const addCourse = (req, res) => {
    const { name, duration } = req.body;

    if (!name || !duration) {
        return res.status(400).json({
            success: false,
            message: 'Name and duration are required'
        });
    }

    res.json({
        success: true,
        message: 'Course Added Successfully',
        data: { id: 3, name, duration }
    });
};

const getCourseById = (req, res) => {
    const { id } = req.params;
    res.json({
        success: true,
        message: `Course with ID ${id} fetched seccessfully`,
        data: { id, name: 'Computer Science', duration: '4 years'}
    });
};

const updateCourse = (req, res) => {
    const { id } = req.params;
    const { name, duration } = req.body;

    res.json({
        success: true,
        message: `Course with ID ${id} updated successfully`,
        data: { id, name, duration }
    });
};

const deleteCourse = (req, res) => {
    const { id } = req.params;
    res.json({
        success: true,
        message: `Course with ID ${id} deleted successfully`
    });
};

module.exports = {
    getCourses,
    addCourse,
    getCourseById,
    updateCourse,
    deleteCourse
};