const express = require("express");
const router = express.Router();
const {
  processNewImages,
  getImages,
  deleteImage,
  generateImages,
} = require("../controllers/dalle");
const { verifyJWTToken } = require("../middleware/authentication");

router.get("/images", verifyJWTToken, getImages);
router.post("/delete", verifyJWTToken, deleteImage);
router.post("/generateimages", verifyJWTToken, generateImages);

module.exports = router;
