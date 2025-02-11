const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modals/UserModal');

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// User Signup
const registerUser = async (req, res) => {
    try {
      const { name, email, phone, city, password } = req.body;
  
      // Validate input
      if (!name || !email || !phone || !city || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }
  
      // Create new user
      const newUser = new User({ name, email, phone, city, password });
      await newUser.save();
  
      // Generate JWT token
      const token = jwt.sign({ id: newUser._id }, "secretKey", { expiresIn: "7d" });
  
      res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

// User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

module.exports = { registerUser, loginUser };