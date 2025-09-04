import mongoose from "mongoose";

const { Schema } = mongoose;

const BatchSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Batch name is required"],
      trim: true,
      maxlength: [100, "Batch name cannot exceed 100 characters"]
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: [true, "Department is required"]
    },

    // Academic information
    semester: {
      type: Number,
      required: [true, "Semester is required"],
      min: [1, "Semester must be at least 1"],
      max: [12, "Semester cannot exceed 12"]
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [2020, "Year must be valid"],
      max: [2030, "Year cannot exceed 2030"]
    },
    section: {
      type: String,
      required: [true, "Section is required"],
      uppercase: true, // A, B, C, etc.
      trim: true,
      maxlength: [5, "Section cannot exceed 5 characters"]
    },
    strength: {
      type: Number,
      required: [true, "Batch strength is required"], // Critical for classroom capacity matching
      min: [1, "Batch strength must be at least 1"],
      max: [500, "Batch strength cannot exceed 500"]
    },

    // Curriculum assignments
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject" // Core subjects for this batch
      }
    ],
    electives: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject" // Elective subjects (NEP 2020 choice-based credits)
      }
    ],
    timetable: {
      type: Schema.Types.ObjectId,
      ref: "Timetable",
      default: null // Current active timetable for this batch
    },
    isActive: {
      type: Boolean,
      default: true // Batch operational status
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Database indexes
BatchSchema.index({ department: 1, semester: 1 }); // Fast department+semester queries
BatchSchema.index({ year: 1, section: 1 }); // Fast year+section queries
BatchSchema.index({ isActive: 1 }); // Fast active batch queries

const Batch = mongoose.model("Batch", BatchSchema);

export default Batch;
