import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    password: { type: String, required: true },
    name: { type: String},
    employeeId: { type: String, unique: true, sparse: true },
    phone: { type: String },
    avatar: { type: String },
    role: { type: String, enum: ["admin", "faculty", "hod"], required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    permissions: [{ type: String }],
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date, default: null },
    joinDate: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Hash password before save
const SALT_ROUNDS = 10;
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Remove password from JSON output
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model("User", userSchema);
export default User;
