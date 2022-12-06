const express = require("express");
const router = express.Router();
const { processNewImages } = require("../controllers/dalle");

router.post("/process", processNewImages);

module.exports = router;
