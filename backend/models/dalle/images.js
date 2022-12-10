const mongoose = require("mongoose");

const Image = new mongoose.Schema({
  uid: String,
  cloudinaryId: String,
  url: String,
  description: String,
});

module.exports = mongoose.model("Image", Image);
