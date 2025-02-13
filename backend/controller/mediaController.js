const Media = require("../modals/MediaModal");
const { deleteFromS3 } = require("../config/s3");
const mongoose = require("mongoose");


const uploadMedia = async (req, res) => {
  try {
    const { originalname, fileUrl } = req.file;
  
    const media = new Media({
      filename: originalname,
      url: fileUrl,
      type: req.file.mimetype.startsWith("image") ? "image" : "video",
      user: req.user.id,
    });

    const saved = await media.save();
    
    res.status(201).json({ message: "Uploaded successfully", media });
  } catch (error) {
    console.error("Error uploading media:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getMedia = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.userId);
    
    const media = await Media.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json(media);
  } catch (error) {
    console.error("Error fetching media:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteMedia = async (req, res) => {
  try {

    const media = await Media.findById(req.params.id);

    console.log(46 , media)

    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }

    // Delete from S3
    await deleteFromS3(media.url);

    // Delete from MongoDB
    await Media.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Media deleted successfully" });
  } catch (error) {
    console.error("Error deleting media:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { uploadMedia, getMedia, deleteMedia };