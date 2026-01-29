const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: String,
  assignedDriver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver"
  }
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
