const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ChristopherRojas-streaming-db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB: ChristopherRojas-streaming-db");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

module.exports = connectDB;
