const express = require("express");
const router = express.Router();
const Item = require("../../../models/item");

router.get("/", async (req, res) => {
  try {
    const customers = await db.collection("Item").find().toArray();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:itemName", async (req, res) => {
  try {
    const itemName = req.params.itemName;
    const customers = await db
      .collection("Item")
      .find({ itemName: { $regex: new RegExp(itemName, "i") } })
      .toArray();

    if (customers.length === 0) {
      return res.status(404).json({ message: "No customers found" });
    }

    res.status(200).json(customers);
  } catch (error) {
    console.error("Error searching for customers:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  const newItem = new Item({
    itemName: req.body.itemName,
    hsnCode: req.body.hsnCode,
    cgst: req.body.cgst,
    sgst: req.body.sgst,
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
