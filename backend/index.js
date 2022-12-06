const express = require("express");
const app = express();
require("dotenv").config({ path: `${__dirname}/.env` });
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    methods: "GET,PUT,POST,DELETE",
  })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

app.use("/dalle/", require("./routes/dalle"));

app.listen(PORT, console.log(`listening on PORT: ${PORT}`));
