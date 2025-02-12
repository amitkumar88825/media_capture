import React from "react";
import MediaUpload from "./MediaUpload";
import MediaGallery from "./MediaGallery";

const Media = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">📂 Media Library</h2>
        
        {/* Media Upload Section */}
        <div className="mb-8">
          <MediaUpload onUploadSuccess={() => window.location.reload()} />
        </div>

        {/* Media Gallery Section */}
        <MediaGallery />
      </div>
    </div>
  );
};

export default Media;