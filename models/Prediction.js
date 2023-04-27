const mongoose = require("mongoose");

const schema = mongoose.Schema;

const predictionSchema = new schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    predictionScore: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prediction", predictionSchema);
