require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { getDb, connectToDb } = require("./db"); // Ensure this path is correct
const customerRoutes = require("../server/v1/customers/customer.route.js");
const invoiceRoutes = require("../server/v1/invoice/invoice.route.js");
const itemRoutes = require("../server/v1/item/item.route");
const Customer = require("../models/customer");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

connectToDb((err) => {
  if (!err) {
    db = getDb();

    app.get("/", (req, res) => {
      console.log("Root route (/) has been accessed");
      res.send("OK");
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } else {
    console.error("Failed to connect to the database");
  }
});

app.use("/customers", customerRoutes);
app.use("/invoices", invoiceRoutes);
app.use("/items", itemRoutes);
app.get("/vehicle", (req, res) => {
  let books = [];

  db.collection("first")
    .find()
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});
app.post("/vehicle", (req, res) => {
  const { vehicleName, vehicleType } = req.body; // Assuming vehicleName and vehicleType are in the request body

  if (!vehicleName || !vehicleType) {
    return res
      .status(400)
      .json({ error: "Vehicle name and type are required" });
  }

  // Insert a new document into 'first' collection
  db.collection("first")
    .insertOne({ vehicleName, vehicleType })
    .then((result) => {
      console.log("New document inserted:", result.ops);

      res.status(201).json(result); // Return the inserted document
    })
    .catch((error) => {
      console.error("Error inserting document:", error);
      res.status(500).json({ error: "Could not create the document" });
    });
});
app.get("/cc", async (req, res) => {
  try {
    let books = [];
    const customers = db
      .collection("Customer")
      .find()
      .forEach((book) => books.push(book))
      .then(() => {
        res.status(200).json(books);
      });
    // res.json(customers.CustomerName);
  } catch (error) {
    console.log({ message: error.message });
    res.status(500).json({ message: error.message });
  }
});
