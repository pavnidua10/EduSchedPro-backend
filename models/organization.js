import mongoose from "mongoose";

const { Schema } = mongoose;

const OrganizationSchema = new Schema(
  {
    instituteName: {
      type: String,
      required: [true, "Institute name is required"],
      trim: true,
      maxlength: [200, "Institute name cannot exceed 200 characters"]
    },
    instituteType: { type: String, trim: true, maxlength: 100 },
    affiliation: { type: String, trim: true, maxlength: 200 },
    website: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, "Please enter a valid website URL"]
    },
    address: { type: String, trim: true, maxlength: 500 },
    city: { type: String, trim: true, maxlength: 100 },
    state: { type: String, trim: true, maxlength: 100 },
    country: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "India"
    },
    postalCode: {
      type: String,
      trim: true,
      match: [/^\d{6}$/, "Please enter a valid 6-digit postal code"]
    },
    phone: {
      type: String,
      trim: true,
      match: [/^\+?[\d\s-()]+$/, "Please enter a valid phone number"]
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email"
      ]
    },
    description: { type: String, trim: true, maxlength: 1000 },
    logo: { type: String, trim: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

OrganizationSchema.index({ instituteName: 1 });
OrganizationSchema.index({ isActive: 1 });

const Organization = mongoose.model("Organization", OrganizationSchema);
export default Organization;
