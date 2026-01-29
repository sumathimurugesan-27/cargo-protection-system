const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  startLocation: String,
  destination: String,
  currentLocation: String,
  startTime: Date,
  endTime: Date,
  status: {
    type: String,
    enum: ["ONGOING", "COMPLETED"],
    default: "ONGOING"
  }
}, { timestamps: true });

module.exports = mongoose.model("Trip", tripSchema);
