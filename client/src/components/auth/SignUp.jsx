import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", city: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/user/signup", formData);
      localStorage.setItem("token", response.data.token);
      setMessage("Signup successful! Redirecting...");
      setTimeout(() => window.location.href = "/dashboard", 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        {message && <p className="text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Name" className="w-full p-3 border rounded-lg" required onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" className="w-full p-3 border rounded-lg" required onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Phone Number" className="w-full p-3 border rounded-lg" required onChange={handleChange} />
          <input type="text" name="city" placeholder="City" className="w-full p-3 border rounded-lg" required onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" className="w-full p-3 border rounded-lg" required onChange={handleChange} />
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;