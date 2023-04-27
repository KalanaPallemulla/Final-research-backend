const mongoose = require("mongoose");

const schema = mongoose.Schema;

const commentSchema = new schema(
  {
    comment: {
      type: String,
      require: true,
    },
    articleId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
