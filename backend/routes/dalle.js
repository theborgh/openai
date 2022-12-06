const express = require("express");
const router = express.Router();
const {
  processNewImages,
  getImages,
  deleteImage,
} = require("../controllers/dalle");

router.get("/images", getImages);
router.post("/process", processNewImages);
router.post("/delete", deleteImage);

module.exports = router;
