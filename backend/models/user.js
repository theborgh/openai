const mongoose = require("mongoose");

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  photoURL: String,
  openaiApiKey: String,
  freeApiRequests: Number,
});

module.exports = mongoose.model("User", User);
