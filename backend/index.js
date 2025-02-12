require('dotenv').config(); 
const express = require('express');
const connectDB = require("./config/db");
const cors = require('cors');
const router = require('./routes/index');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cors({ origin: 'https://exquisite-basbousa-0e5399.netlify.app/' ,credentials: true }));

// Database Connection
connectDB();

// Routes
app.use('/', (req, res) => {
    res.send('<h1>Welcome to our Media Capture and Storage App</h1>');
});
app.use('/api', router);
app.use('*', (req, res) => {
    console.log('404 Not Found');
});

// Server Connection
app.listen(process.env.PORT, '0.0.0.0' ,() => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
