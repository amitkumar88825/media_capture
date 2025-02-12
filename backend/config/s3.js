const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

// Initialize the S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Upload function using AWS SDK v3
const uploadToS3 = async (file) => {
  try {    
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${Date.now()}_${path.basename(file.originalname)}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    // Upload using AWS SDK v3
    const parallelUploads3 = new Upload({
      client: s3Client,
      params: uploadParams,
    });

    const result = await parallelUploads3.done();
    
    return result.Location;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
};

// Function to delete an object from S3
const deleteFromS3 = async (fileKey) => {
  try {

    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey, 
    };

    const command = new DeleteObjectCommand(deleteParams);

    await s3Client.send(command);

    return { success: true, message: "File deleted successfully" };
  } catch (error) {
    console.error("Error deleting from S3:", error);
    throw error;
  }
};

module.exports = { uploadToS3, deleteFromS3 };