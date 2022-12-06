const cloudinary = require("../cloudinaryConfig");

const processNewImages = async (req, res) => {
  if (req.body && req.body.length !== 0) {
    console.log("req.body[0].url is", req.body[0]);

    const result = await cloudinary.uploader.upload(req.body[0].url, {
      folder: "dalle",
    });

    console.log("uploaded, response: ", result);
    req.body.forEach((el) => {});
    res.status(200).json({ url: result.url, id: result.asset_id });
  } else {
    res.status(400).json("Some error occurred");
  }
};

module.exports = { processNewImages };
