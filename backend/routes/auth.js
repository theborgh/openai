const express = require("express");
const router = express.Router();
const { createNewUser } = require("../controllers/auth");

router.get("/createuser", createNewUser);

module.exports = router;
