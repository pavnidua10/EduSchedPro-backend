import mongoose from "mongoose";

const { Schema } = mongoose;

const FacultySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
      unique: true // one-to-one mapping with User
    },
    employeeId: {
      type: String,
      required: [true, "Employee ID is required"],
      unique: true,
      trim: true
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: [true, "Department is required"]
    },
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject" // Subjects faculty can teach
      }
    ],
    maxHoursPerDay: {
      type: Number,
      default: 4, // scheduling constraint
      min: [1, "At least 1 hour per day required"]
    },
    maxHoursPerWeek: {
      type: Number,
      default: 20, // scheduling constraint
      min: [1, "At least 1 hour per week required"]
    },
    unavailableSlots: [
      {
        day: { type: String, required: true }, // MON, TUE
        time: { type: String, required: true }, // e.g., "1", "2", "MON-1"
        reason: { type: String, required: true }
      }
    ],
    preferences: {
      preferredSlots: { type: [String], default: [] },
      avoidSlots: { type: [String], default: [] }
    },
    workload: {
      type: Number,
      default: 0 // auto-calculated workload
    },
    isActive: {
      type: Boolean,
      default: true // faculty active status
    }
  },
  {
    timestamps: true
  }
);

FacultySchema.index({ employeeId: 1 });
FacultySchema.index({ isActive: 1 });

const Faculty = mongoose.model("Faculty", FacultySchema);
export default Faculty;
