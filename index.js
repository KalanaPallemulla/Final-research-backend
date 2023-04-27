const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const database = require("./database");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

fs.readdirSync("./routes").map((route) =>
  app.use("/api", require(`./routes/${route}`))
);

const port = process.env.PORT;

app.listen(port, async (err) => {
  if (err) {
    console.log("Server error:", err);
    return;
  }
  console.log(`Server is running on port: ${port}`);
  await database();
});
