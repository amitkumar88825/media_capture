require('dotenv').config(); 
const express = require('express');
const connectDB = require("./config/db");
const cors = require('cors');
const router = require('./routes/index');

const app = express();
app.use(express.json());

const allowedOrigins = [
  'http://localhost:3000',
  'https://exquisite-basbousa-0e5399.netlify.app'
];


app.use(cors({
  origin: '*',
  credentials: true
}));

// Database Connection
connectDB();

app.use((req, res, next) => {
    console.log(`Incoming Request:`);
    console.log(`Origin: ${req.headers.origin || 'Direct Request'}`);
    console.log(`Method: ${req.method}`);
    console.log(`Path: ${req.originalUrl}`);
    console.log(`IP: ${req.ip}`);
    console.log(`User-Agent: ${req.headers['user-agent']}`);
    next();
});

// Fix: Define req, res in the callback function
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

// API Routes
app.use('/api', router);

// Fix: Send a 404 response
app.use('*', (req, res) => {
    console.log('404 Not Found');
    res.status(404).json({ error: 'Not Found' });
});

// Server Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});