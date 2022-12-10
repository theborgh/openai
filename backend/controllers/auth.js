require("dotenv").config({ path: `${__dirname}/../.env` });
const userDoc = require("../models/user");
const jwt = require("jsonwebtoken");

// create new user in mongo
const createNewUser = async (req, res) => {
  console.log("+ createNewUser");

  if (process.env.VERBOSE) {
    console.log("req.query = ", req.query);
  }

  try {
    // TODO: only create if there is no other user with same username!

    const newUser = await userDoc.create({
      username: req.query.username,
      photoURL: "",
      openaiApiKey: "",
      freeApiRequests: 10,
    });

    if (process.env.VERBOSE) {
      console.log("newUser = ", newUser);
    }

    res.status(200).json(
      jwt.sign(
        { username: req.query.username, photoURL: req.query.photoURL },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      )
    );
  } catch (e) {
    res.status(500).json(e);
  }
};

const getJWT = (req, res) => {
  console.log("+ getJWT");

  if (process.env.VERBOSE) {
    console.log("req.query = ", req.query);
  }

  try {
    res.status(200).json(
      jwt.sign({ username: req.query.username }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      })
    );
  } catch (e) {
    res.status(500).json(e);
  }
};

const verifyToken = (req, res) => {
  console.log("+ verifyToken");

  try {
    jwt.verify(req.body.token, process.env.JWT_SECRET);
    res.status(200).json("verified");
  } catch (e) {
    res.status(403).json(e);
  }
};

module.exports = { createNewUser, getJWT, verifyToken };
