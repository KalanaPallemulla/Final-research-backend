const { checkVariables, authentication } = require("../middlewares/helper");
const { Comment } = require("../models/Comment");

const router = require("express").Router();

router.post(
  "/comment",
  checkVariables(["comment", "articleId"]),
  authentication,
  async (req, res) => {
    try {
      const data = req.body;
      const userId = req.user;
      const comment = new Comment(data, userId);

      const response = await comment.save();
      return res.send(200, response);
    } catch (error) {
      console.log(error);
      return res.send(500, "Comment Add error");
    }
  }
);

module.exports = router;
