import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api";


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(formData);
      setMessage(data.message);
      localStorage.setItem("token", data.token); 
      localStorage.setItem("user", JSON.stringify(data.user)); 
      navigate("/media");
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