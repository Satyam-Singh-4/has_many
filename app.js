const express = require("express");
const sequelize = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const router = require("./router");
const category = require("./model/category");
const mobile = require("./model/mobiles");
const electronics = require("./model/electronics");

const app = express();
app.use(cors());
// To read JSON data in URL body
app.use(bodyParser.json());
// To read log URLs
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);
//synchronizing models

sequelize
  .sync({ alter: true })
  .then((result) => {
    console.log("database created");
  })
  .catch((err) => {
    console.log("not created");
  });
async function run() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    app.listen(process.env.PORT, () => {
      console.log(`server is running on port no:${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

run();
