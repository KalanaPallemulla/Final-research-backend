const { checkVariables, authentication } = require("../middlewares/helper");
const Prediction = require("../models/Prediction");
const router = require("express").Router();

router.post(
  "/prediction/addPrediction",
  checkVariables([
    "result",
    "age",
    "hight",
    "serumCalciumLevel",
    "infantGastrationalAge",
    "inadequateSunlightExposure",
    "boneFractures",
    "bowLegs",
  ]),
  authentication,
  async (req, res) => {
    try {
      const {
        result,
        age,
        hight,
        serumCalciumLevel,
        infantGastrationalAge,
        inadequateSunlightExposure,
        boneFractures,
        bowLegs,
      } = req.body;
      const userId = req.user;

      const prediction = new Prediction({
        userId,
        result,
        age,
        hight,
        serumCalciumLevel,
        infantGastrationalAge,
        inadequateSunlightExposure,
        boneFractures,
        bowLegs,
      });

      const response = await prediction.save();

      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send("Add prediction server error");
    }
  }
);

router.get("/prediction/getPredictions", authentication, async (req, res) => {
  try {
    const userId = req.user;
    const response = await Prediction.find({ userId });
    if (response.length > 0) {
      return res.status(200).send(response);
    } else {
      return res.status(404).send("No records found");
    }
  } catch (error) {
    return res.status(500).send("Get prediction server error");
  }
});

module.exports = router;
