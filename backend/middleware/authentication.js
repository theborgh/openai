require("dotenv").config({ path: `${__dirname}/../.env` });
const jwt = require("jsonwebtoken");

const verifyJWTToken = (req, res, next) => {
  if (process.env.VERBOSE === "true") console.log("verifyJWTToken");

  const token = req.headers.authorization.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    return res.status(403).json("JWT token is invalid: ", token);
  }
};

module.exports = { verifyJWTToken };
