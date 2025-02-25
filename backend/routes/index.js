const express = require('express');
const userRoutes = require('./userRoute');
const mediaRoutes = require('./mediaRoute');
const router = express.Router();

router.use('/auth', userRoutes); 
router.use('/media', mediaRoutes);

module.exports = router;