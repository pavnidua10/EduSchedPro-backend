const express = require("express");
const { signup, login, verifyTeacher } = require("../controllers/auth");
const { protect, restrictTo } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// only admin can verify teachers
router.put("/verify/:id", protect, restrictTo("admin"), verifyTeacher);

module.exports = router;
