const express = require('express');
const upload = require('../middleware/uploadMiddleware'); // Multer middleware
const { uploadMedia, getAllMedia } = require('../controller/mediaController');

const router = express.Router();

// Upload Media
router.post('/upload', upload.single('file'), uploadMedia);

// Fetch All Media
router.get('/', getAllMedia);

module.exports = router;