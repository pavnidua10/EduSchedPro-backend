import express from "express";
import { signup, login, verifyTeacher } from "../controllers/auth.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// only admin can verify teachers
router.put("/verify/:id", protect, restrictTo("admin"), verifyTeacher);

export default router;
