const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes')

const app = express()

// credentials
const PORT = 5000;
const DB_URL = "mongodb://localhost/12701/mployee";

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