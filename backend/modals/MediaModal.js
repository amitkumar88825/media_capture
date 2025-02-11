const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
  filename: { type: String},
  url: { type: String}, 
  type: { type: String, enum: ["image", "video"] },
  uploadDate: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Media", MediaSchema);