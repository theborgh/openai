const express = require("express");
const router = express.Router();
const { processNewImages, getImages } = require("../controllers/dalle");

router.get("/images", getImages);
router.post("/process", processNewImages);

module.exports = router;
