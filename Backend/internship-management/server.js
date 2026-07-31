const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

const studentRoutes = require('./src/routes/student.routes');
const courseRoutes = require('./src/routes/course.routes');
const trainerRoutes = require('./src/routes/trainer.routes');
const taskRoutes = require('./src/routes/task.routes');
const userRoutes = require('./src/routes/userRoutes');

app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/health', (req, res) => {
    res.json({
        status: 'success',
        message: 'Server Running Successfully',
        timestamp: new Date().toISOString()
    });
});

app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found'
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
    console.log(`Health Check: http://localhost:${PORT}/health`);
    console.log(`Users API: http://localhost:${PORT}/api/students`);
    console.log(`Users API: http://localhost:${PORT}/api/courses`);
    console.log(`Users API: http://localhost:${PORT}/api/trainers`);
    console.log(`Users API: http://localhost:${PORT}/api/tasks`);
    console.log(`Users API: http://localhost:${PORT}/api/users`);
});