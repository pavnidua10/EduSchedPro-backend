const mongoose = require("mongoose");

// Subject schema
const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },          // e.g., Data Structures
  code: { type: String, required: true, unique: true }, // e.g., CS201
  department: { type: String, required: true },    // e.g., CSE, ECE
  semester: { type: Number, required: true },      // e.g., 3, 5, 7
  credits: { type: Number, default: 4 },           // optional
});

module.exports = {
  Subject: mongoose.model("Subject", subjectSchema),
};
