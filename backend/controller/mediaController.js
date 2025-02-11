const Media = require('../modals/MediaModal');

// Upload Media
const uploadMedia = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        const newMedia = new Media({
            filename: req.file.filename,
            path: req.file.path,
            mimetype: req.file.mimetype,
            size: req.file.size
        });

        await newMedia.save();
        res.status(201).json({ message: "Media uploaded successfully", media: newMedia });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Fetch All Media
const getAllMedia = async (req, res) => {
    try {
        const mediaFiles = await Media.find();
        res.status(200).json(mediaFiles);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

module.exports = { uploadMedia, getAllMedia };