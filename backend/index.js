const express = require("express");
const app = express();
require("dotenv").config({ path: `${__dirname}/.env` });
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

app.listen(PORT, console.log(`listening on PORT: ${PORT}`));
