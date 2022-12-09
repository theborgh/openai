const mongoose = require("mongoose");

const User = new mongoose.Schema({
  openaiApiKey: String,
  username: String,
  dalleDocId: String,
  davinciDocId: String,
  freeApiRequests: Number,
});

module.exports = mongoose.model("User", User);
