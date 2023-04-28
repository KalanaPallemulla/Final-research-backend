const mongoose = require("mongoose");

const schema = mongoose.Schema;

const articlesSchema = new schema(
  {
    topic: {
      type: String,
      require: true,
    },
    body: {
      type: String,
      require: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },

  { timestamps: true }
);

const Articles = mongoose.model("Article", articlesSchema);

module.exports = Articles;
