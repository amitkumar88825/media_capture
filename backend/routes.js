const express = require('express');
const controller = require('./controller')

const router = express.Router();

router.get('/jobs', controller.getAllJobs);

module.exports = router;
