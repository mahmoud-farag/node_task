const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 3 },
  jobTitle: { type: String, required: true, min: 3 },
  email: { type: String, required: true },
});

const AuthorModel = mongoose.model("Author", authorSchema);
module.exports = AuthorModel;
