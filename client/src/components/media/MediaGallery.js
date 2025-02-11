import React, { useEffect, useState } from "react";
import { fetchMedia, deleteMedia } from "../../api";

const MediaGallery = () => {
  const [media, setMedia] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const loadMedia = async () => {
      const token = localStorage.getItem("token");
      const { data } = await fetchMedia(token, filter);
      setMedia(data);
    };
    loadMedia();
  }, [filter]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await deleteMedia(id, token);
    setMedia(media.filter((item) => item._id !== id));
  };

  return (
    <div>
      <h3>Media Gallery</h3>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="">All</option>
        <option value="image">Images</option>
        <option value="video">Videos</option>
      </select>
      <div>
        {media.map((item) => (
          <div key={item._id}>
            {item.type === "image" ? (
              <img src={item.url} alt="media" width="100" />
            ) : (
              <video src={item.url} controls width="100"></video>
            )}
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaGallery;