require("dotenv").config({ path: `${__dirname}/../.env` });
const userDoc = require("../models/user");
const imagesDoc = require("../models/dalle/images");
const cloudinary = require("../cloudinaryConfig");
const jwt = require("jsonwebtoken");

// create new user in mongo
const createNewUser = async (req, res) => {
  console.log("+ createNewUser");

  if (process.env.VERBOSE) {
    console.log("req.query = ", req.body);
  }

  try {
    const sameEmailUser = await userDoc.findOne({
      email: req.body.uid,
    });

    console.log("+ sameEmailUser = ", sameEmailUser);

    if (!sameEmailUser) {
      try {
        const newUser = await userDoc.create({
          email: req.body.uid,
          username: req.body.username,
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
        .json("Username or email already exists, please try a different one");
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
    jwt.verify(req.query.token, process.env.JWT_SECRET);
    res.status(200).json("verified");
  } catch (e) {
    res.status(403).json(e);
  }
};

const deleteUser = async (req, res) => {
  console.log("+ deleteUser");

  if (process.env.VERBOSE === "true") console.log("req.query: ", req.query);

  try {
    // delete all images for user
    const dbResponse = await imagesDoc.find({ uid: req.query.email }).exec();

    if (process.env.VERBOSE === "true")
      console.log("db response: ", dbResponse);

    const result = await cloudinary.api.delete_resources(
      dbResponse.map((el) => el.cloudinaryId)
    );

    if (process.env.VERBOSE === "true") console.log("result: ", result);

    await imagesDoc
      .deleteMany({ _id: { $in: dbResponse.map((el) => el._id) } })
      .exec();

    // delete user from db

    // delete user from firebase

    res.status(200).json("deleted");
  } catch (e) {
    res.status(500).json({ message: "error: " + e.message });
  }
};

const updateKey = async (req, res) => {
  console.log("+ updateKey");

  if (process.env.VERBOSE === "true") console.log("req.body: ", req.body);

  try {
    // look up user by email, update key to req.body.key
    await userDoc.findOneAndUpdate(
      { email: req.body.email },
      { openaiApiKey: req.body.key },
      { new: true }
    );

    res.status(200).json("ok");
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = {
  createNewUser,
  getJWT,
  verifyToken,
  checkCreateUser,
  deleteUser,
  updateKey,
};
