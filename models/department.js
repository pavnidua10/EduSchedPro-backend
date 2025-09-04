import mongoose from "mongoose";

const { Schema } = mongoose;

const DepartmentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Department name is required"],
      trim: true,
      maxlength: [100, "Department name cannot exceed 100 characters"]
    },
    code: {
      type: String,
      required: [true, "Department code is required"],
      unique: true,
      trim: true,
      maxlength: [20, "Department code cannot exceed 20 characters"]
    },
    hod: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null // Head of Department
    },
    faculty: [
      {
        type: Schema.Types.ObjectId,
        ref: "User" // Faculty members
      }
    ],
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject" // Subjects taught in department
      }
    ],
    isActive: {
      type: Boolean,
      default: true // Operational status
    }
  },
  {
    timestamps: true
  }
);

DepartmentSchema.index({ code: 1 });
DepartmentSchema.index({ isActive: 1 });

const Department = mongoose.model("Department", DepartmentSchema);
export default Department;
