import React, { useState } from "react";
import { uploadMedia } from "../../api";

const MediaUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    const token = localStorage.getItem("token");
    if (!file || !token) return;

    setUploading(true);
    await uploadMedia(file, token);
    
    setUploading(false);
    setFile(null);
    onUploadSuccess();
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">📤 Upload Media</h3>
      
      {/* File Input */}
      <label className="block w-full bg-gray-100 border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-200">
        <input
          type="file"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {file ? file.name : "Choose a file to upload"}
      </label>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`mt-4 px-6 py-2 text-white font-semibold rounded-lg transition ${
          file
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default MediaUpload;