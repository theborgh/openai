const express = require("express");
const router = express.Router();
const {
  createNewUser,
  getJWT,
  verifyToken,
  checkCreateUser,
  deleteUser,
  updateKey,
} = require("../controllers/auth");
const { verifyJWTToken } = require("../middleware/authentication");

router.post("/createuser", createNewUser);
router.get("/getjwt", getJWT);
router.get("/verifytoken", verifyToken);
router.post("/checkuser", checkCreateUser);
router.delete("/deleteuser", deleteUser);
router.put("/updatekey", verifyJWTToken, updateKey);

module.exports = router;
