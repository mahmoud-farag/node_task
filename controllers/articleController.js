const { StatusCodes } = require("http-status-codes");

const ArticleModel = require("../models/articleModel.js");
const Joi = require("joi");
const mongoose = require("mongoose");
const asyncErrHandler = require("../middlewares/errorHandler.js");

const articleSchema = Joi.object().keys({
  title: Joi.string().required(),
  body: Joi.string().required(),
  // author: Joi.string().required(),
});

exports.createNewArticle = asyncErrHandler(async (req, res, next) => {
  const payload = req.body;

  if (Object.keys(payload).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ ErrorMessage: "payload can not be empty" });
  }

  // Validate user input before inserting into DB
  const result = articleSchema.validate(payload);

  if (result.error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ ErrorMessage: result.error.details[0].message });
  }

  payload.author = req.author;
  const newArticle = new ArticleModel(payload);

  const article = await newArticle.save();

  res.status(StatusCodes.OK).json({ message: "successfully created", article });
});

exports.getAllArticles = asyncErrHandler(async (req, res, next) => {
  const { title } = req.query;

  let result;
  if (title) {
    //search for specific article by its title
    result = await ArticleModel.find({ title });

    //  return all existing articles
  } else result = await ArticleModel.find({});

  if (!result.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).json("no articles founded");
  }

  res.status(StatusCodes.OK).json(result);
});

exports.getSingleArticle = asyncErrHandler(async (req, res, next) => {
  const articleID = req.params.id;

  const article = await ArticleModel.find({ _id: articleID });

  if (article.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).json("article not found");
  } else {
    return res.status(StatusCodes.OK).json(article);
  }
});

exports.deleteArticle = asyncErrHandler(async (req, res, next) => {
  const articleID = req.params.id;

  const result = await ArticleModel.findOneAndRemove({ _id: articleID });

  if (!result)
    return res.status(StatusCodes.NOT_FOUND).json("your article not found");
  else res.status(StatusCodes.OK).json("Article deleted successfully");
});

exports.updateArticle = asyncErrHandler(async (req, res, next) => {
  const payload = req.body;
  const articleID = req.params.id;

  let currentArticle = await ArticleModel.findOne({ _id: articleID });

  if (!currentArticle) {
    return res.status(StatusCodes.NOT_FOUND).json("your target not found");
  } else {
    currentArticle.title = payload.title ? payload.title : currentArticle.title;
    currentArticle.body = payload.body ? payload.body : currentArticle.body;

    const updatedArticle = await currentArticle.save();
    res.status(StatusCodes.OK).json(updatedAuthor);
  }
});
