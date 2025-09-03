const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["teacher", "admin"], required: true },
  
  designation: { type: String }, // only for admin (HOD, Director, etc.)
  department: String,            // mostly for teachers
  
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
  maxHoursPerWeek: { type: Number, default: 20 },
  availableDays: [{ type: String, enum: ["Mon","Tue","Wed","Thu","Fri","Sat"] }],
  availableSlots: [{ type: mongoose.Schema.Types.ObjectId, ref: "Timeslot" }],
  
  isVerified: { type: Boolean, default: false } // ✅ teacher must be approved by admin
}, { timestamps: true });

// Hash password before save
const SALT_ROUNDS = 10;

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password") || !this.password) return next();
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
