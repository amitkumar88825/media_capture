const express = require("express");
const upload = require("../config/s3");
const authenticateUser = require("../middleware/authMiddleware");
const { uploadMedia, getMedia, deleteMedia } = require("../controller/mediaController");

const router = express.Router();

router.post("/upload", authenticateUser, upload.single("file"), uploadMedia);
router.get("/", authenticateUser, getMedia);
router.delete("/:id", authenticateUser, deleteMedia);

module.exports = router;