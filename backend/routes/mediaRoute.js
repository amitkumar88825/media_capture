const express = require("express");
const multer = require("multer");
const { uploadAndSaveToS3, upload } = require("../middleware/uploadMiddleware");
const authenticateUser = require("../middleware/authMiddleware");
const { uploadMedia, getMedia, deleteMedia } = require("../controller/mediaController");

const router = express.Router();

router.post("/upload", authenticateUser, upload.single("file"), uploadAndSaveToS3, uploadMedia);
router.get("/", authenticateUser, getMedia);
router.delete("/:id", authenticateUser, deleteMedia);

module.exports = router;