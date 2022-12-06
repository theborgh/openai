const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Could not connect: ${err}`);
    process.exit(1);
  }
};

module.exports = connectToMongoDB;
