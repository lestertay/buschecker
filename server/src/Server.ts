var express = require("express");
var cors = require("cors");
var PORT = process.env.port || 8000;
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Hello World12345!");
});

app.listen(PORT, () => {
  console.log("Server Started at Port, 8000");
});
