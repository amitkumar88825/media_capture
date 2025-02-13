import axios from "axios";

const API_URL = "https://media-capture.onrender.com";

// Register User
console.log(6 , API_URL)
export const registerUser = (data) => axios.post(`${API_URL}/api/auth/signup`, data);

// Login User
export const loginUser = (data) => axios.post(`${API_URL}/api/auth/login`, data);

// Upload Media
export const uploadMedia = (file, token) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(`${API_URL}/media/upload`, formData, {
    headers: { Authorization: `${token}`, "Content-Type": "multipart/form-data" },
  });
};

// Fetch Media
export const fetchMedia = (token, type = "video") => 
  axios.get(`${API_URL}/media?type=${type || "video"}`, {
    headers: { Authorization: `${token}` },
});

// Delete Media
export const deleteMedia = (id, token) => axios.delete(`${API_URL}/media/${id}`, {
  headers: { Authorization: `${token}` },
});
