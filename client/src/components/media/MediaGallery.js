import React, { useEffect, useState } from "react";
import { deleteMedia } from "../../api";
import MediaPlaer from "./MediaPlayer";
import axios from "axios";

const MediaGallery = () => {
  const [media, setMedia] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {

    const loadMedia = async () => {
      try {
          const token = localStorage.getItem ("token");
          const user = JSON.parse(localStorage.getItem("user"));
          const response = await axios.get(`https://media-capture.onrender.com/api/media/${user._id}`, {
              headers: {
                  Authorization: `${token}`,
                  'Content-Type': 'application/json'
              }
          });

          setMedia(response.data)
      } catch (error) {
          console.error('Error fetching media:', error.response ? error.response.data : error.message);
      }
    };

  loadMedia()  
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await deleteMedia(id, token);
    setMedia(media.filter((item) => item._id !== id));
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mt-6">
      <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">📸 Media Gallery</h3>

      {/* Media Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.length > 0 ? (
          media.map((item) => (
            <div key={item._id} className="bg-gray-100 rounded-lg p-3 shadow-md">
              {item.type === "image" ? (
                <img
                  src={item.url}
                  alt="media"
                  className="w-full h-40 object-cover rounded-md cursor-pointer"
                  onClick={() => setSelectedMedia(item)}
                />
              ) : (
                <video
                  src={item.url}
                  controls
                  className="w-full h-40 rounded-md cursor-pointer"
                  onClick={() => setSelectedMedia(item)}
                ></video>
              )}
              <button
                className="bg-red-500 text-white w-full py-2 mt-3 rounded-md hover:bg-red-600 transition"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No media found.</p>
        )}
      </div>

      {/* Media Modal */}
      {selectedMedia && (
        <MediaPlaer onClose={() => setSelectedMedia(null)}>
          {selectedMedia.type === "image" ? (
            <img src={selectedMedia.url} alt="media" className="max-w-full max-h-screen rounded-lg" />
          ) : (
            <video src={selectedMedia.url} controls autoPlay className="max-w-full max-h-screen rounded-lg"></video>
          )}
        </MediaPlaer>
      )}
    </div>
  );
};

export default MediaGallery;
