const processNewImages = async (req, res) => {
  console.log("processNewImages: req.body is ", req.body);

  res
    .status(200)
    .json(
      "executed successfully, returning cloudinary URLs to store in localStorage & state"
    );
};

module.exports = { processNewImages };
