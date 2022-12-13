const express = require("express");
const router = express.Router();
const {
  getImages,
  deleteImage,
  generateImages,
} = require("../controllers/dalle");
const { verifyJWTToken } = require("../middleware/authentication");

router.get("/images", verifyJWTToken, getImages);
router.delete("/delete", verifyJWTToken, deleteImage);
router.post("/generateimages", verifyJWTToken, generateImages);

module.exports = router;
