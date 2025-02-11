import axios from "axios";

const API_URL = "http://localhost:5001/api";

// Register User
export const registerUser = (data) => axios.post(`${API_URL}/auth/signup`, data);

// Login User
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);

// Upload Media
export const uploadMedia = (file, token) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(`${API_URL}/media/upload`, formData, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
  });
};

// Fetch Media
export const fetchMedia = (token, type = "") => axios.get(`${API_URL}/media?type=${type}`, {
  headers: { Authorization: `Bearer ${token}` },
});

// Delete Media
export const deleteMedia = (id, token) => axios.delete(`${API_URL}/media/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});