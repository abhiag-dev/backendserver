const { MongoClient } = require("mongodb");

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(
      "mongodb+srv://abhishekag64064:7l8bmaaCTvD20gsh@cluster0.2iqr2uj.mongodb.net/vehicles",
      {
        serverSelectionTimeoutMS: 5000, // Example: Increase server selection timeout
        socketTimeoutMS: 30000, // Example: Increase socket timeout
      }
    )
      .then((client) => {
        dbConnection = client.db();
        console.log("Connected to MongoDB");
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};
