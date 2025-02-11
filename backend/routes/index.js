const express = require('express');
const userRoutes = require('./userRoute');
const mediaRoutes = require('./mediaRoute');
const authRoutes = require('./authRoute');


const router = express.Router();

router.use('/user', userRoutes); 
// router.use('/media', mediaRoutes);
// router.use('/media', authRoutes);


module.exports = router;