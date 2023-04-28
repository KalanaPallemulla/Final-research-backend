const mongoose = require("mongoose");

const schema = mongoose.Schema;

const predictionSchema = new schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    hight: {
      type: Number,
      required: true,
    },
    serumCalciumLevel: {
      type: Number,
      required: true,
    },
    infantGastrationalAge: {
      type: Boolean,
      required: true,
    },
    inadequateSunlightExposure: {
      type: Boolean,
      required: true,
    },
    boneFractures: {
      type: Boolean,
      required: true,
    },
    bowLegs: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prediction", predictionSchema);
