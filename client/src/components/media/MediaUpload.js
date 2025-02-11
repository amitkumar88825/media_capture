import React, { useState } from "react";
import { uploadMedia } from "../../api";

const MediaUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const token = localStorage.getItem("token");
    if (!file || !token) return;
    
    await uploadMedia(file, token);
    onUploadSuccess();
  };

  return (
    <div>
      <h3>Upload Media</h3>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default MediaUpload;