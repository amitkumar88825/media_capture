const Media = require("../modals/MediaModal");
const { AWS } = require("@aws-sdk/client-s3");


exports.uploadMedia = async (req, res) => {
  const { key, location } = req.file;
  
  const media = new Media({
    filename: key,
    url: location,
    type: req.file.mimetype.startsWith("image") ? "image" : "video",
    user: req.user.id,
  });

  await media.save();
  res.status(201).json({ message: "Uploaded successfully", media });
};

exports.getMedia = async (req, res) => {
  const { type, page = 1 } = req.query;
  const filter = type ? { type } : {};
  const media = await Media.find(filter).limit(10).skip((page - 1) * 10);
  
  res.json(media);
};

exports.deleteMedia = async (req, res) => {
  const media = await Media.findById(req.params.id);
  if (!media) return res.status(404).json({ message: "Media not found" });

  // Delete from S3
  const s3 = new AWS.S3();
  await s3.deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: media.filename }).promise();

  await media.remove();
  res.json({ message: "Media deleted" });
};