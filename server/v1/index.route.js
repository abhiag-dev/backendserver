const express = require("express");
const router = express.Router();

const customerRoutes = require("./customers/customer.route");
const invoiceRoutes = require("./invoice/invoice.route");
const itemRoutes = require("./item/item.route.js");

router.use("/customers", customerRoutes);
router.use("/invoices", invoiceRoutes);
router.use("/items", itemRoutes);
router.get("/", (req, res) => {
  console.log("Root route (/) has been accessed");
  res.send("OK");
});

module.exports = router;
