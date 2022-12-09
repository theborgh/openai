require("dotenv").config({ path: `${__dirname}/../.env` });
const mongoose = require("mongoose");
const userDoc = require("../models/user");

// create new user in mongo
const createNewUser = async (req, res) => {
  console.log("+ createNewUser");

  if (process.env.VERBOSE) {
    console.log("req.body = ", req.body);
  }

  try {
    const newUser = await userDoc.create({
      username: req.body.username,
      openaiApiKey: "",
      freeApiRequests: 10,
    });

    if (process.env.VERBOSE) {
      console.log("newUser = ", newUser);
    }

    // TODO: take user id, add to jwt token, send token back

    res.status(200).json(getJWT());
  } catch (e) {
    res.status(500).json(e);
  }
};

// create new user in mongo
const getJWT = () => {
  console.log("+ getJWT");

  return "sampleToken";
};

module.exports = { createNewUser };
