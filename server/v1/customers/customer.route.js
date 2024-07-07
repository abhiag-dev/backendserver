const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const customers = await db.collection("Customer").find().toArray();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const newCustomer = {
      CustomerName: req.body.CustomerName,
      mobile: req.body.mobile,
      receiverName: req.body.receiverName,
      receiverAddress: req.body.receiverAddress,
      receiverCityState: req.body.receiverCityState,
      receiverGSTIN: req.body.receiverGSTIN,
      receiverState: req.body.receiverState,
      receiverStateCode: req.body.receiverStateCode,
    };
    const result = await db.collection("Customer").insertOne(newCustomer);
    await res.status(201).json(newCustomer); // Return the inserted customer
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(400).json({ message: "Bad Request" });
  }
});
router.get("/:CustomerName", async (req, res) => {
  try {
    const customerName = req.params.CustomerName;
    const customers = await db
      .collection("Customer")
      .find({ CustomerName: { $regex: new RegExp(customerName, "i") } })
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
module.exports = router;
