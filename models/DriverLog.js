const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  expectedDriver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  detectedDriver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  violationType: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DriverLog", logSchema);
