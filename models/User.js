const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      minLength: 6,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
