const express = require("express");
const router = express.Router();
const { createNewUser, getJWT, verifyToken } = require("../controllers/auth");

router.get("/checkuid");
router.get("/createuser", createNewUser);
router.get("/getjwt", getJWT);
router.post("/verifytoken", verifyToken);

module.exports = router;
