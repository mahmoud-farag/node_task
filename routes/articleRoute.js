const express = require("express");
const {
  createNewArticle,
  deleteArticle,
  getAllArticles,
  getSingleArticle,
  updateArticle,
} = require("../controllers/articleController.js");
const { isAuthorLogin } = require("../middlewares/isLogin.js");
const articleRouter = express.Router();

articleRouter.post("/", isAuthorLogin, createNewArticle);
articleRouter.get("/", getAllArticles);
articleRouter.get("/:id", getSingleArticle);
articleRouter.delete("/:id", isAuthorLogin, deleteArticle);
articleRouter.put("/:id", isAuthorLogin, updateArticle);
module.exports = articleRouter;
