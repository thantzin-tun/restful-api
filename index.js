const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const middleware = require("./Routes/router");

dotenv.config();

app.use(express.json());
app.use(bodyParser.json());
app.use("/", middleware);

mongoose.connect(process.env.Mongo_DB, () => {
  console.log("Mongo is conneted now!");
});

app.listen(process.env.Port, function () {
  console.log("Server is running now at port ", process.env.Port);
});
