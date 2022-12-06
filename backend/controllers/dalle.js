const cloudinary = require("../cloudinaryConfig");
const imageDocInDB = require("../models/dalle/images");

const processNewImages = async (req, res) => {
  console.log("processNewImages");

  // Upload all the newly generated images to cloudinary
  if (req.body && req.body.length !== 0) {
    const promises = req.body.map((item, i) => {
      return cloudinary.uploader.upload(req.body[i].url, {
        folder: "dalle",
      });
    });

    const data = await Promise.all(promises);
    const response = data.map((item) => ({ url: item.url, id: item.asset_id }));

    res.status(200).json(response);

    // send image id, url, and description to mongo
    const dbData = response.map((item, i) => ({
      id: item.id,
      url: item.url,
      description: req.body[i].description,
    }));
    storeNewImagesInDB(dbData);
  } else {
    res.status(400).json("Some error occurred, request payload is invalid");
  }
};

const storeNewImagesInDB = async (data) => {
  console.log("storeNewImagesInDB");

  try {
    await imageDocInDB.insertMany(data);

    console.log("images stored in DB");
  } catch (error) {
    console.log(error, error.message);
  }
};

module.exports = { processNewImages, storeNewImagesInDB };
