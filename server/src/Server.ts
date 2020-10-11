var express = require("express");
var cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Hello World12345!");
});

app.listen(8000, () => {
  console.log("Server Started at Port, 8000");
});
