const express = require("express");
const authorRouter = express.Router();
const {
  createNewAuthor,
  deleteAuthor,
  getAllAuthors,
  getSingleAuthor,
  updateAuthor,
} = require("../controllers/authorController.js");
const AuthorRouter = express.Router();

authorRouter.post("/", createNewAuthor);
authorRouter.get("/", getAllAuthors);
authorRouter.get("/:id", getSingleAuthor);
authorRouter.delete("/:id", deleteAuthor);
authorRouter.put("/:id", updateAuthor);

module.exports = authorRouter;
