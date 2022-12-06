const cloudinary = require("../cloudinaryConfig");
const imageDocInDB = require("../models/dalle/images");

const getImages = async (req, res) => {
  console.log("getImages");

  try {
    const response = await imageDocInDB.find({}).select("url description");
    // console.log("getimages response: ", response);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json(e);
    console.log("error: ", e);
  }
};

const processNewImages = async (req, res) => {
  console.log("= processNewImages =");

  // Upload all the newly generated images to cloudinary
  if (req.body && req.body.length !== 0) {
    const promises = req.body.map((item, i) => {
      return cloudinary.uploader.upload(req.body[i].url, {
        folder: "dalle",
      });
    });

    const data = await Promise.all(promises);
    const response = data.map((item) => item.url);

    res.status(200).json(response);

    // send url and description to mongo
    const dbData = response.map((item, i) => ({
      url: item,
      description: req.body[i].description,
    }));
    storeNewImagesInDB(dbData);
  } else {
    res.status(400).json("Some error occurred, request payload is invalid");
  }
};

const storeNewImagesInDB = async (data) => {
  console.log("== storeNewImagesInDB ==");

  try {
    await imageDocInDB.insertMany(data);

    console.log(data.length, " images stored in DB");
  } catch (error) {
    console.log(error, error.message);
  }
};

const deleteImage = async (req, res) => {
  console.log("=== deleteImage ===");

  console.log("id: ", req.body._id);

  try {
    await imageDocInDB.findByIdAndRemove(req.body._id);

    // TODO: delete from cloudinary!

    res.status(200).json("ok");
  } catch (e) {
    console.log(e, e.message);
    res.status(500).json(e);
  }
};

module.exports = { processNewImages, getImages, deleteImage };
