const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  freight: {
    type: Number,
    required: false,
  },
  invoiceValue: {
    type: Number,
    required: false,
  },
  vehicleNumber: {
    type: String,
    required: false,
  },
  item1Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  item2Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: false,
  },
  item1Quantity: {
    type: Number,
    required: true,
  },
  item2Quantity: {
    type: Number,
    required: false,
  },
  item1Rate: {
    type: Number,
    required: true,
  },
  item2Rate: {
    type: Number,
    required: false,
  },
  item1TotalAmount: {
    type: Number,
    required: false,
  },
  item2TotalAmount: {
    type: Number,
    required: false,
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;
