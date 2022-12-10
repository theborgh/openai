require("dotenv").config({ path: `${__dirname}/../.env` });
const cloudinary = require("../cloudinaryConfig");
const imageDocInDB = require("../models/dalle/images");

const getImages = async (req, res) => {
  console.log("getImages");

  try {
    const response = await imageDocInDB
      .find({ uid: req.query.uid })
      .select("url description");

    res.status(200).json(response);
  } catch (e) {
    res.status(500).json(e);
    console.log("error: ", e);
  }
};

const storeNewImagesInDB = async (data) => {
  console.log("== storeNewImagesInDB ==");

  try {
    const dbResp = await imageDocInDB.insertMany(data);

    console.log(data.length, " image(s) stored in DB");
    return dbResp;
  } catch (error) {
    console.log(error, error.message);
  }
};

// Delete image from db and cloudinary
const deleteImage = async (req, res) => {
  console.log("== deleteImage ==");

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

const generateImages = async (req, res) => {
  console.log("= generate images =");

  if (process.env.VERBOSE === "true") console.log("req.body: ", req.body);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(process.env.OPENAI_API_KEY),
    },
    body: JSON.stringify({
      prompt: req.body.prompt,
      n: req.body.n,
      size: req.body.size,
    }),
  };

  const response = await fetch(
    "https://api.openai.com/v1/images/generations",
    requestOptions
  );

  if (!response.ok) {
    res.status(500).json("- An error has occurred: ", response);
  } else {
    const data = await response.json();
    const openAIData = Array.from(data.data, (item) => ({
      url: item.url,
      description: req.body.prompt,
      _id: "",
    }));

    if (process.env.VERBOSE === "true") {
      console.log("openAIData: ", openAIData);
    }

    // Upload all the newly generated images to cloudinary
    if (openAIData.length !== 0) {
      const promises = openAIData.map((image) => {
        return cloudinary.uploader.upload(image.url, {
          folder: "dalle",
        });
      });

      const data = await Promise.all(promises);
      const response = data.map((item) => item.url);

      // send url and description to mongo
      const dbData = response.map((item, i) => ({
        uid: req.body.uid,
        cloudinaryId: data[i].public_id,
        url: item,
        description: openAIData[i].description,
      }));

      const dbResponse = await storeNewImagesInDB(dbData);
      const r = data.map((item, i) => ({
        url: item.url,
        description: openAIData[i].description,
        _id: dbResponse[i]._id,
      }));

      res.status(200).json(r);
    } else {
      res.status(400).json("Some error occurred, request payload is invalid");
    }
  }
};

module.exports = { getImages, deleteImage, generateImages };
