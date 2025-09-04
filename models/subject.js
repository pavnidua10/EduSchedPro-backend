import mongoose from "mongoose";

const { Schema } = mongoose;

const SubjectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Subject name is required"],
      trim: true,
      maxlength: [200, "Subject name cannot exceed 200 characters"]
    },
    code: {
      type: String,
      required: [true, "Subject code is required"],
      unique: true,
      trim: true,
      maxlength: [20, "Subject code cannot exceed 20 characters"]
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: [true, "Department is required"]
    },
    semester: {
      type: Number,
      required: [true, "Semester is required"],
      min: [1, "Minimum semester is 1"],
      max: [12, "Semester cannot exceed 12"]
    },
    credits: {
      type: Number,
      required: [true, "Credits are required"],
      min: [1, "Credits must be at least 1"],
      max: [10, "Credits cannot exceed 10"]
    },
    hoursPerWeek: {
      type: Number,
      required: [true, "Hours per week is required"],
      min: [1, "Minimum 1 hour per week required"],
      max: [40, "Cannot exceed 40 hours per week"]
    },
    type: {
      type: String,
      enum: ["theory", "practical", "elective"],
      required: [true, "Subject type is required"]
    },
    faculty: [
      {
        type: Schema.Types.ObjectId,
        ref: "Faculty" // Who can teach this subject
      }
    ],
    isNEPMultidisciplinary: {
      type: Boolean,
      default: false
    },
    prerequisites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject"
      }
    ],
    maxStudents: {
      type: Number,
      default: null
    },
    description: {
      type: String,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true // Subject availability
    }
  },
  {
    timestamps: true
  }
);

SubjectSchema.index({ code: 1 });
SubjectSchema.index({ semester: 1 });
SubjectSchema.index({ isActive: 1 });

const Subject = mongoose.model("Subject", SubjectSchema);
export default Subject;
