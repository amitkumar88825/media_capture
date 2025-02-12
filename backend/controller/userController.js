const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modals/UserModal');

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
      const user = await newUser.save();
  
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.status(201).json({ message: "User registered successfully", token, user });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

// User Login
const loginUser = async (req, res) => {
  try {

      console.log(38 , ' login user')

      const { email, password } = req.body;

      console.log(39 , req.body)

      // Check if user exists
      const user = await User.findOne({ email });

      console.log(42 , user)

      if (!user) return res.status(400).json({ message: "User not found" });

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
      res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { registerUser, loginUser };