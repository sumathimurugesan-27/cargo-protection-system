const express = require("express");
const Driver = require("../models/Driver");
const Vehicle = require("../models/Vehicle");
const DriverLog = require("../models/DriverLog");

const router = express.Router();

/**
 * Raspberry Pi sends:
 * vehicleNumber + fingerprintId
 */
router.post("/verify-driver", async (req, res) => {
  const { vehicleNumber, fingerprintId } = req.body;

  const vehicle = await Vehicle.findOne({ vehicleNumber })
    .populate("assignedDriver");

  const detectedDriver = await Driver.findOne({ fingerprintId });

  if (!vehicle || !detectedDriver) {
    return res.status(400).json({ message: "Invalid data" });
  }

  if (vehicle.assignedDriver._id.equals(detectedDriver._id)) {
    return res.json({ status: "AUTHORIZED" });
  }

  // Unauthorized
  await DriverLog.create({
    vehicle: vehicle._id,
    expectedDriver: vehicle.assignedDriver._id,
    detectedDriver: detectedDriver._id,
    violationType: "UNAUTHORIZED_DRIVER",
    message: `${detectedDriver.name} detected instead of ${vehicle.assignedDriver.name}`
  });

  res.json({ status: "UNAUTHORIZED" });
});

router.get("/logs", async (req, res) => {
  const logs = await DriverLog.find()
    .populate("vehicle")
    .populate("expectedDriver")
    .populate("detectedDriver");

  res.json(logs);
});

module.exports = router;
