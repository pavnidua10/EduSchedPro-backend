import mongoose from "mongoose";

const { Schema } = mongoose;

const ClassroomSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Classroom name is required"],
      trim: true,
      maxlength: [100, "Classroom name cannot exceed 100 characters"]
    },
    number: {
      type: String,
      required: [true, "Classroom number is required"],
      unique: true,
      trim: true,
      maxlength: [50, "Classroom number cannot exceed 50 characters"]
    },
    building: {
      type: String,
      required: [true, "Building is required"],
      trim: true,
      maxlength: [100, "Building name cannot exceed 100 characters"]
    },
    floor: {
      type: Number,
      min: [0, "Floor cannot be negative"],
      max: [100, "Floor number seems invalid"]
    },
    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
      min: [1, "Capacity must be at least 1"],
      max: [1000, "Capacity cannot exceed 1000"]
    },
    type: {
      type: String,
      enum: ["lecture", "lab", "seminar"],
      required: [true, "Classroom type is required"]
    },
    equipment: {
      type: [String],
      default: [] // e.g., ["projector", "computers"]
    },
    isActive: {
      type: Boolean,
      default: true // Availability status
    },
    unavailableSlots: [
      {
        day: { type: String, required: true }, // e.g., Mon, Tue
        time: { type: String, required: true }, // e.g., "10:00-11:00"
        reason: { type: String, required: true } // e.g., "maintenance"
      }
    ]
  },
  {
    timestamps: true // auto adds createdAt & updatedAt
  }
);

// Index for quick classroom lookup
ClassroomSchema.index({ number: 1 });
ClassroomSchema.index({ isActive: 1 });

const Classroom = mongoose.model("Classroom", ClassroomSchema);

export default Classroom;
