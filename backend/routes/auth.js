const express = require("express");
const router = express.Router();
const { createNewUser, getJWT } = require("../controllers/auth");

router.get("/createuser", createNewUser);
router.get("/getjwt", getJWT);

module.exports = router;
