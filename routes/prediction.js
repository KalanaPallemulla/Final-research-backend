const { checkVariables, authentication } = require("../middlewares/helper");
const Prediction = require("../models/Prediction");
const router = require("express").Router();

router.post(
  "/prediction/addPrediction",
  checkVariables(["predictionScore"]),
  authentication,
  async (req, res) => {
    try {
      const { predictionScore } = req.body;
      const userId = req.user;

      const prediction = new Prediction({
        userId,
        predictionScore,
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
