async function addInvoice(req, res) {
  const invoicesCollection = db.collection("invoice");

  try {
    const {
      invoiceNumber,
      date,
      freight,
      vehicleNumber,
      CustomerName,
      itemName1,
      item1TotalAmount,
      itemName2,
      item1Quantity,
      item1Rate,
      item2Quantity,
      item2Rate,
      invoiceValue,
      item2TotalAmount,
    } = req.body;

    const newInvoice = {
      invoiceNumber,
      date,
      freight,
      vehicleNumber,
      CustomerName,
      itemName1,
      item1TotalAmount,
      itemName2,
      item1Quantity,
      item1Rate,
      item2Quantity,
      item2Rate,
      invoiceValue,
      item2TotalAmount,
    };

    const result = await invoicesCollection.insertOne(newInvoice);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ error: error.message });
  }
}

async function addBulkInvoices(req, res) {
  const invoicesCollection = db.collection("invoice");

  const invoices = req.body.invoices;

  try {
    const result = await invoicesCollection.insertMany(invoices);
    res.status(201).json(result.ops);
  } catch (error) {
    console.error("Error creating bulk invoices:", error);
    res.status(500).json({ error: error.message });
  }
}

async function editInvoice(req, res) {
  const invoicesCollection = db.collection("invoice");

  try {
    const { id } = req.params;
    const updates = req.body;

    const result = await invoicesCollection.findOneAndUpdate(
      { invoiceNumber: id },
      { $set: updates },
      { returnOriginal: false }
    );

    await res.json(result);
  } catch (error) {
    console.error("Error updating invoice:", error);
    res.status(500).json({ error: "Failed to update invoice" });
  }
}

async function listInvoices(req, res) {
  const invoicesCollection = db.collection("invoice");

  try {
    const invoices = await invoicesCollection.find().toArray();
    res.json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
}

async function getInvoice(req, res) {
  const invoicesCollection = db.collection("invoice");

  try {
    const { invoiceNumber } = req.params;
    const invoices = await invoicesCollection.find().toArray();

    let dataa = {};

    let invoice = null;
    const cursor = invoicesCollection.find();

    await cursor.forEach((doc) => {
      if (doc.invoiceNumber === invoiceNumber) {
        invoice = doc;
        res.json(invoice);
      }
    });
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res.status(500).json({ error: "Failed to fetch invoice" });
  }
}

async function getLastInvoiceNumber(req, res) {
  const invoicesCollection = db.collection("invoice");

  try {
    const lastInvoice = await invoicesCollection.findOne(
      {},
      { sort: { invoiceNumber: -1 }, projection: { invoiceNumber: 1 } }
    );
    const lastInvoiceNumber = lastInvoice ? lastInvoice.invoiceNumber : 0;
    res.json({ lastInvoiceNumber });
  } catch (error) {
    console.error("Error fetching the last invoice number:", error);
    res.status(500).json({ error: "Failed to fetch the last invoice number" });
  }
}

async function getLastItemsRates(req, res) {
  const invoicesCollection = db.collection("invoice");

  try {
    const CustomerName = req.params.CustomerName;

    const lastInvoices = await invoicesCollection
      .find({ CustomerName })
      .sort({ date: -1 })
      .limit(10)
      .toArray();

    const lastItemsRates = lastInvoices.map((invoice) => ({
      itemName1: invoice.itemName1,
      rate1: invoice.item1Rate,
      date: invoice.date,
      itemName2: invoice.itemName2,
      rate2: invoice.item2Rate,
    }));

    res.json(lastItemsRates);
  } catch (error) {
    console.error("Error fetching last items rates:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
const deleteInvoiceByNumber = async (req, res) => {
  const { invoiceNumber } = req.params; // Extract invoice number from request params

  try {
    const deletedInvoice = await Invoice.findOneAndDelete({ invoiceNumber });

    if (!deletedInvoice) {
      return res.status(404).json({ error: "Invoice not found." });
    }

    res.status(200).json({ message: "Invoice deleted successfully." });
  } catch (err) {
    console.error("Error deleting invoice:", err);
    res.status(500).json({ error: "Failed to delete invoice." });
  }
};

module.exports = {
  addInvoice,
  addBulkInvoices,
  editInvoice,
  listInvoices,
  getLastInvoiceNumber,
  getInvoice,
  getLastItemsRates,
  deleteInvoiceByNumber, // Add deleteInvoice to exports
};
