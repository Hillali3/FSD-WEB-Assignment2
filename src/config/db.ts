const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.DB_CONNECT);
    const db = await mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => console.log("connected to database"));

} catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;
