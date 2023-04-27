const { checkVariables, authentication } = require("../middlewares/helper");
const Articles = require("../models/Articles");
const Comment = require("../models/Comment");
const User = require("../models/User");

const router = require("express").Router();

router.post(
  "/article/addArticle",
  checkVariables(["topic", "body"]),
  authentication,
  async (req, res) => {
    try {
      const { topic, body } = req.body;
      const userId = req.user;
      const article = new Articles({
        topic,
        body,
        userId,
      });
      const response = await article.save();

      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Add articles server error");
    }
  }
);

router.get("/article/getArticles", async (req, res) => {
  try {
    const articles = await Articles.find()
      .sort({ createdAt: 1 })
      .populate("comments")
      .exec();
    if (articles.length > 0) {
      // articles.map(async(article) => {
      //   const user = await User.findById(article.userId)
      //   article.
      // })
      return res.status(200).send(articles);
    }
    return res.status(401).send("No articles found");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Get articles server error");
  }
});

//add comment
router.post("/article/:id/comment", authentication, async (req, res) => {
  try {
    const articleId = req.params.id;
    const comment = req.body.comment;
    const userId = req.user;

    const newComment = new Comment({
      articleId: articleId,
      comment: comment,
      userId,
    });

    const savedComment = await newComment.save();

    const updatedArticle = await Articles.findByIdAndUpdate(
      articleId,
      { $push: { comments: savedComment._id } },
      { new: true }
    );
    return res.status(200).send(updatedArticle);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error adding comment");
  }
});

router.delete(
  "/article/:articleId/comment/:commentId",
  authentication,
  async (req, res) => {
    try {
      const { articleId, commentId } = req.params;
      const comment = await Comment.findById({ _id: commentId });
      console.log(comment.userId, req.user);
      if (comment.userId.toString() === req.user.toString()) {
        await Articles.findByIdAndUpdate(articleId, {
          $pull: { comments: commentId },
        });

        const commentRes = await Comment.findByIdAndDelete(commentId);

        return res.send(200, "Deleted");
      } else {
        return res.send(401, "You are not authorized");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting comment." });
      return;
    }
  }
);

module.exports = router;
