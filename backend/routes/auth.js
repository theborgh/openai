const express = require("express");
const router = express.Router();
const {
  createNewUser,
  getJWT,
  verifyToken,
  checkCreateUser,
  deleteUser,
} = require("../controllers/auth");

router.get("/checkuid");
router.get("/createuser", createNewUser);
router.get("/getjwt", getJWT);
router.post("/verifytoken", verifyToken);
router.post("/checkuser", checkCreateUser);
router.delete("/deleteuser", deleteUser);

module.exports = router;
