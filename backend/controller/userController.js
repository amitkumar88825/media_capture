const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modals/UserModal');

const registerUser = async (req, res) => {
    try {
        const { name, email, phone, city, password } = req.body;

        if (!name || !email || !phone || !city || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, phone, city, password: hashedPassword });
        
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ message: "User registered successfully", token, user });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error", details: error.message });
    }
};

// User Login
const loginUser =  async (req, res) => {
  try {
      const { email, password } = req.body;
      if (!email || !password) {
          console.error("Missing email or password");
          return res.status(400).json({ error: "All fields are required" });
      }

      const user = await User.findOne({ email });
      if (!user) {
          console.error("User not found:", email);
          return res.status(404).json({ error: "User not found" });
      }

      if (!user.password) {
          console.error("User password is missing in the database!");
          return res.status(500).json({ error: "User password is missing in the database" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          console.error("Invalid password attempt for user:", email);
          return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      return res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({ error: "Server error", details: error.message });
  }
};

module.exports = { registerUser, loginUser };