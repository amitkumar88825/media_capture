require('dotenv').config(); 
const express = require('express');
const connectDB = require("./config/db");
const cors = require('cors');
const router = require('./routes/index');

const app = express();

app.use(cors({
    origin: ["http://localhost:3000", "https://exquisite-basbousa-0e5399.netlify.app"],
    credentials: true,
}));

// Database Connection
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', router);

// Server Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});