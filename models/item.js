const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,

    required: true,
    unique: true,
  },
  hsnCode: {
    type: String,
    required: false,
  },
  cgst: {
    type: Number,
    required: true,
  },
  sgst: {
    type: Number,
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
