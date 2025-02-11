import React from "react";
import MediaUpload from "./MediaUpload";
import MediaGallery from "./MediaGallery";

const Media = () => {
  return (
    <div>
      <h2>Media</h2>
      <MediaUpload onUploadSuccess={() => window.location.reload()} />
      <MediaGallery />
    </div>
  );
};

export default Media;