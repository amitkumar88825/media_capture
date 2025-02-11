require('dotenv').config(); // Load .env variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/index');

const app = express();
app.use(express.json());
app.use(cors());

// Load credentials from .env
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

// Database Connection
mongoose.connect(DB_URL)
    .then(() => console.log('Database Connection Established'))
    .catch((err) => console.log(err));

// Routes
app.use('/api', router);
app.use('*', (req, res) => {
    console.log('404 Not Found');
});

// Server Connection
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});