const express = require("express");
const router = express.Router();
const Vehicle = require("./vehicle");
const mongoose = require("mongoose");

router.get("/api/vehicles", async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    res.json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/api/vehicles", async (req, res) => {
  try {
    const newVehicle = new Vehicle(req.body);

    const savedVehicle = await newVehicle.save();

    res.status(201).json(savedVehicle);
  } catch (error) {
    console.error("Error adding vehicle:", error);
    res.status(500).json({ error: "Failed to add vehicle" });
  }
});

module.exports = {
  router,
};
