const mongoose = require("mongoose");

const timeslotSchema = new mongoose.Schema({
  day: { 
    type: String, 
    enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], 
    required: true 
  },
  startTime: { type: String, required: true },   // e.g., "09:00"
  endTime: { type: String, required: true },     // e.g., "10:00"
  isLab: { type: Boolean, default: false },      // differentiate lab slots
  maxTeachers: { type: Number, default: 1 },     // e.g., for combined lectures
});

module.exports = {
  Timeslot: mongoose.model("Timeslot", timeslotSchema),
};
