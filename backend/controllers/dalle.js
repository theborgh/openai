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

    // send url and description to mongo
    const dbData = response.map((item, i) => ({
      cloudinaryId: data[i].public_id,
      url: item,
      description: req.body[i].description,
    }));

    const dbResponse = await storeNewImagesInDB(dbData);
    const r = data.map((item) => ({
      url: item.url,
      description: item.description,
      _id: dbResponse._id,
    }));

    res.status(200).json(r);
  } else {
    res.status(400).json("Some error occurred, request payload is invalid");
  }
};

const storeNewImagesInDB = async (data) => {
  console.log("== storeNewImagesInDB ==");

  try {
    const dbResp = await imageDocInDB.insertMany(data);

    console.log(data.length, " images stored in DB");
    return dbResp;
  } catch (error) {
    console.log(error, error.message);
  }
};

// Delete image from db and cloudinary
const deleteImage = async (req, res) => {
  console.log("=== deleteImage ===");

  try {
    const dbResponse = await imageDocInDB.findByIdAndRemove(req.body._id);
    const response = await cloudinary.uploader.destroy(dbResponse.cloudinaryId);
    console.log("+ cloudinary deletion: ", response.result);

    res.status(200).json("ok");
  } catch (e) {
    console.log(e, e.message);
    res.status(500).json(e);
  }
};

module.exports = { processNewImages, getImages, deleteImage };
