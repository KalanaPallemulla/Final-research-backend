const mongoose = require("mongoose");

async function createConnection() {
  try {
    mongoose.connect(process.env.DB, {}, () => console.log("DB connected"));
  } catch (err) {
    console.error(err);
  }
}

module.exports = createConnection;
