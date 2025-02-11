const express = require('express');
const { registerUser, loginUser } = require('../controller/userController');

const router = express.Router();

// User Signup
router.post('/signup', registerUser);

// User Login
router.post('/login', loginUser);

module.exports = router;