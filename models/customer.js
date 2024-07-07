const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  CustomerName: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: false,
  },
  receiverName: {
    type: String,
    required: true,
  },
  receiverAddress: {
    type: String,
    required: true,
  },
  receiverCityState: {
    type: String,
    required: true,
  },
  receiverGSTIN: {
    type: String,
    required: true,
  },
  receiverState: {
    type: String,
    required: true,
  },
  receiverStateCode: {
    type: String,
    required: true,
  },
});

customerSchema.virtual("invoices", {
  ref: "Invoice",
  localField: "CustomerName",
  foreignField: "CustomerName",
  justOne: false,
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
