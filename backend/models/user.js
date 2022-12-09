const mongoose = require("mongoose");

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  openaiApiKey: String,
  freeApiRequests: Number,
});

module.exports = mongoose.model("User", User);
