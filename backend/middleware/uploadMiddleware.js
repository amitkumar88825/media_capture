const multer = require("multer");
const { uploadToS3 } = require("../config/s3.js");

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();

// File type validation
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg", "image/png", "image/gif", "image/webp",
    "video/mp4", "video/mkv", "video/webm",
    "audio/mp3", "audio/wav", "audio/mpeg",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images, videos, and audio files are allowed."));
  }
};

// Upload middleware (max 100MB)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
});

// Middleware for handling S3 upload
const uploadAndSaveToS3 = async (req, res, next) => {
  try {

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileUrl = await uploadToS3(req.file); 

    req.file.fileUrl = fileUrl;
    next();
  } catch (error) {
    console.error("S3 Upload Error:", error);
    return res.status(500).json({ error: "Failed to upload file to S3" });
  }
};

module.exports = { upload, uploadAndSaveToS3 }; 