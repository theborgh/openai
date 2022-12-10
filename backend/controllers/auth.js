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
    const sameEmailUser = await userDoc.findOne({
      email: req.query.uid,
    });

    console.log("+ sameEmailUser = ", sameEmailUser);

    if (!sameEmailUser) {
      try {
        const newUser = await userDoc.create({
          email: req.query.uid,
          username: req.query.username,
          photoURL: "",
          openaiApiKey: "",
          freeApiRequests: 10,
        });

        if (process.env.VERBOSE) {
          console.log("newUser = ", newUser);
        }

        res.status(200).json("");
      } catch (e) {
        res.status(500).json(e);
      }
    } else {
      console.log("About to return status 500");
      res
        .status(500)
        .json("Username already exists, please try a different one");
    }
  } catch (e) {
    res.status(500).json("Unexpected database error");
  }
};

const checkCreateUser = async (req, res) => {
  console.log("checkCreateUser");

  if (process.env.VERBOSE === "true") console.log("req.body: ", req.body);

  try {
    const sameEmailUser = await userDoc.findOne({
      email: req.body.email,
    });

    console.log("+ sameEmailUser = ", sameEmailUser);

    if (!sameEmailUser) {
      try {
        const newUser = await userDoc.create({
          email: req.body.email,
          username: req.body.username,
          photoURL: req.body.photoURL,
          openaiApiKey: "",
          freeApiRequests: 10,
        });

        if (process.env.VERBOSE) {
          console.log("newUser = ", newUser);
        }

        res.status(200).json("");
      } catch (e) {
        res.status(500).json(e);
      }
    } else {
      res.status(201).json("User already exists");
    }
  } catch (e) {
    res.status(500).json("Unexpected database error");
  }

  res.status(200);
};

const getJWT = async (req, res) => {
  console.log("+ getJWT");

  if (process.env.VERBOSE) {
    console.log("req.query = ", req.query);
  }

  try {
    const sameEmailUser = await userDoc.findOne({
      email: req.query.email,
    });

    res.status(200).json(
      jwt.sign(
        {
          email: req.query.email,
          displayName: sameEmailUser.username,
          photoURL: sameEmailUser.photoURL,
          openaiApiKey: sameEmailUser.openaiApiKey,
        },
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

const verifyToken = (req, res) => {
  console.log("+ verifyToken");

  try {
    jwt.verify(req.body.token, process.env.JWT_SECRET);
    res.status(200).json("verified");
  } catch (e) {
    res.status(403).json(e);
  }
};

module.exports = { createNewUser, getJWT, verifyToken, checkCreateUser };
