import mongoose from "mongoose";

const { Schema } = mongoose;

const OptimizationResultSchema = new Schema(
  {
    timetable: {
      type: Schema.Types.ObjectId,
      ref: "Timetable",
      required: [true, "Timetable reference is required"]
    },
    algorithm: {
      type: String,
      required: [true, "Algorithm is required"],
      enum: ["genetic", "simulated_annealing", "hybrid", "greedy_mvp", "cp_sat"]
    },
    parameters: {
      type: Schema.Types.Mixed,
      default: {}
    },
    metrics: {
      conflicts: { type: Number, required: true, min: 0 },
      utilization: { type: Number, required: true, min: 0, max: 100 },
      fairness: { type: Number, required: true, min: 0, max: 100 },
      satisfaction: { type: Number, required: true, min: 0, max: 100 }
    },
    executionTime: {
      type: Number,
      required: [true, "Execution time is required"],
      min: 0
    },
    iterations: {
      type: Number,
      required: [true, "Iterations is required"],
      min: 0
    },
    convergence: [{ type: Number }]
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

OptimizationResultSchema.index({ timetable: 1 });
OptimizationResultSchema.index({ algorithm: 1 });
OptimizationResultSchema.index({ createdAt: -1 });

const OptimizationResult = mongoose.model("OptimizationResult", OptimizationResultSchema);
export default OptimizationResult;
