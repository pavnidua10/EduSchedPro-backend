import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Authenticate user
export const protect = async (req, res, next) => {
  let token;

  // First check headers for Bearer token
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Or check cookies (if you're setting JWT in cookies during login)
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token failed" });
  }
};

// Restrict to specific roles
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Not authorized for this action" });
    }
    next();
  };
};

// Check teacher verification
export const requireVerifiedTeacher = (req, res, next) => {
  if (req.user.role === "teacher" && !req.user.isVerified) {
    return res.status(403).json({ message: "Teacher not verified by admin" });
  }
  next();
};
