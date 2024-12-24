const express = require('express');
const controller = require('./controller')

const router = express.Router();

router.get('/all-jobs', controller.getAllJobs);
router.get('/job/:id', controller.findJobBySearch);

module.exports = router;