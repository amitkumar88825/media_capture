require('dotenv').config(); 
const express = require('express');
const connectDB = require("./config/db");
const cors = require('cors');
const router = require('./routes/index');

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// Routes
app.use('/api', router);
app.use('*', (req, res) => {
    console.log('404 Not Found');
});

// Server Connection
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});