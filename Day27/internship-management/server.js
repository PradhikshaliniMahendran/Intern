const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

const userRoutes = require('./src/routes/userRoutes');
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
    console.log(`Health Check: http://localhost:${PORT}/health`);
    console.log(`Users API: http://localhost:${PORT}/api/users`);
});