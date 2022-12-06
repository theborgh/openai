const cloudinary = require("../cloudinaryConfig");

const processNewImages = async (req, res) => {
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
  } else {
    res.status(400).json("Some error occurred, request payload is invalid");
  }
};

module.exports = { processNewImages };
