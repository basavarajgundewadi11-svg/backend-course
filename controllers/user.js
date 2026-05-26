const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create Account
const createAccount = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check empty fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check user already exists
    const checkuser = await User.findOne({ email });

    if (checkuser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashpassword = await bcrypt.hash(password, 12);

    // Create user
    const userdata = await User.create({
      name,
      email,
      password: hashpassword,
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      userdata,
    });

  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: e.message,
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check empty fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user
    const userdata = await User.findOne({ email });

    if (!userdata) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, userdata.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: userdata._id },
      process.env.secret_key,
      { expiresIn: "10d" }
    );

    res.status(200).json({
      success: true,
      message: "Welcome to KLE College",
      userdata,
      token,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

module.exports = { createAccount, login };