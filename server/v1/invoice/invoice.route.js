const express = require("express");
const router = express.Router();
const invoiceController = require("./invoice.controller");

router.post("/add", invoiceController.addInvoice);
router.post("/badd", invoiceController.addBulkInvoices);

router.put("/edit/:id", invoiceController.editInvoice);
router.get("/list", invoiceController.listInvoices);
router.get("/last-invoice-number", invoiceController.getLastInvoiceNumber);
router.get("/:invoiceNumber", invoiceController.getInvoice);
router.get(
  "/:CustomerName/last-items-rates",
  invoiceController.getLastItemsRates
);

module.exports = router;
