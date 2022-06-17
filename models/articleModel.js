const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  comments: [
    {
      commentText: String,
      commentedBy: { type: ObjectId, ref: "Author" },
    },
  ],
  author: {
    type: ObjectId,
    ref: "Author",
  },
});

const ArticleModel = mongoose.model("Article", articleSchema);
module.exports = ArticleModel;
