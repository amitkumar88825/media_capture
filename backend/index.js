const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const router = require('./routes')

const app = express()
app.use(express.json())
app.use(cors())

// credentials
const PORT = 5000;
const DB_URL = "mongodb+srv://panditup571:0sUpbHyYnPNwEODH@traveller.fjilx.mongodb.net/?retryWrites=true&w=majority&appName=traveller";

// middleware
app.use(express.json())

// database Connection
mongoose.connect(DB_URL).then(() => {
    console.log('Database Connection Established')
}).catch((err) => {
    console.log(err)
})

// routes
app.use('/api', router)

// server connection
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})