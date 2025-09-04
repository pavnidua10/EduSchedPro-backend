import mongoose from "mongoose";

const { Schema } = mongoose;

const ConstraintSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Constraint name is required"],
      trim: true,
      maxlength: [100, "Constraint name cannot exceed 100 characters"]
    },
    type: {
      type: String,
      required: [true, "Constraint type is required"],
      enum: ["hard", "soft"]
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"]
    },
    weight: {
      type: Number,
      default: 1,
      min: 0,
      max: 10
    },
    isActive: {
      type: Boolean,
      default: true
    },
    parameters: {
      type: Schema.Types.Mixed,
      default: {}
    }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ConstraintSchema.index({ type: 1, isActive: 1 });
ConstraintSchema.index({ name: 1 });

const Constraint = mongoose.model("Constraint", ConstraintSchema);
export default Constraint;
