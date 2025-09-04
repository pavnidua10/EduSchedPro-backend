import jwt from "jsonwebtoken";
import User from "../models/user.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Signup
export const signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ status: "error", message: "Email, password and role are required" });
    }

    if (password.length < 8) {
      return res.status(400).json({ status: "error", message: "Password must be at least 8 characters long" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ status: "error", message: "User already exists" });
    }

    const user = await User.create({
      email,
      password,
      role,
      isVerified: role === "teacher" ? false : true
    });

    return res.status(201).json({ status: "success", message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);

      // Set token as httpOnly cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true in production (HTTPS)
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      return res.json({ status: "success", message: "Login successful" });
    } else {
      return res.status(401).json({ status: "error", message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

// Admin verifies teacher
export const verifyTeacher = async (req, res) => {
  try {
    const teacher = await User.findById(req.params.id);
    if (!teacher || teacher.role !== "teacher") {
      return res.status(404).json({ status: "error", message: "Teacher not found" });
    }

    teacher.isVerified = true;
    await teacher.save();

    return res.json({ status: "success", message: "Teacher verified successfully" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
