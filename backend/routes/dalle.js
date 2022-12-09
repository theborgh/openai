const express = require("express");
const router = express.Router();
const {
  processNewImages,
  getImages,
  deleteImage,
  generateImages,
} = require("../controllers/dalle");

router.get("/images", getImages);
router.post("/process", processNewImages);
router.post("/delete", deleteImage);
router.post("/generateimages", generateImages);

module.exports = router;
