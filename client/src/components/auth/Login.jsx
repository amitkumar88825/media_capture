import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice"; 
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(formData) {
        const response = await axios.post(`https://media-capture.onrender.com/api/auth/login`, formData);
        if(response.status === 200) {
          setMessage(response.data.message);
          localStorage.setItem("token", response.data.token); 
          localStorage.setItem("user", JSON.stringify(response.data.user));
          dispatch(login(response.data.user)); 
          navigate("/media");  
        }
      }
    } catch (error) {
      setMessage(error?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {message && <p className="text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" name="email" placeholder="Email"
            className="w-full p-3 border rounded-lg" required
            onChange={handleChange}
          />
          <input 
            type="password" name="password" placeholder="Password"
            className="w-full p-3 border rounded-lg" required
            onChange={handleChange}
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;