const mongoose = require("mongoose");

const Image = new mongoose.Schema({
  cloudinaryId: String,
  url: String,
  description: String,
});

module.exports = mongoose.model("Image", Image);
