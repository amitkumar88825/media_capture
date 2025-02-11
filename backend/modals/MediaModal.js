const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fileType: {
    type: String,
    enum: ["image", "video", "audio"],
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const Media = mongoose.model("Media", mediaSchema);
module.exports = Media;