const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: String,
  photoURL: String,
  openaiApiKey: String,
  freeApiRequests: Number,
});

module.exports = mongoose.model("User", User);
