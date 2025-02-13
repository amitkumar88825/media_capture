import axios from "axios";

const API_URL = "https://media-capture.onrender.com";

// Upload Media
export const uploadMedia = (file, token) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(`${API_URL}/media/upload`, formData, {
    headers: { Authorization: `${token}`, "Content-Type": "multipart/form-data" },
  });
};
