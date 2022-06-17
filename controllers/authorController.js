const Joi = require("joi");

const AuthorModel = require("../models/authorModel.js");

const { StatusCodes } = require("http-status-codes");
const asyncErrHandler = require("../middlewares/errorHandler.js");

const authorSchema = Joi.object().keys({
  name: Joi.string().required(),
  jobTitle: Joi.string().required(),
  email: Joi.string().required(),
});

exports.createNewAuthor = asyncErrHandler(async (req, res, next) => {
  const payload = req.body;

  if (Object.keys(payload).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ ErrorMessage: "payload can not be empty" });
  }

  //  Validate client Input before inserting into DB
  const result = authorSchema.validate(payload);
  if (result.error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ ErrorMessage: result.error.details[0].message });
  }

  payload.author = req.author;
  const newAuthor = new AuthorModel(payload);

  const author = await newAuthor.save();
  res
    .status(StatusCodes.CREATED)
    .json({ message: "successfully created", author });
});

exports.getAllAuthors = asyncErrHandler(async (req, res, next) => {
  const result = await AuthorModel.find({});

  if (!result) {
    return res.status(StatusCodes.NOT_FOUND).json("No result for this query");
  }
  res.status(StatusCodes.OK).json(result);
});

exports.getSingleAuthor = asyncErrHandler(async (req, res, next) => {
  const authorID = req.params.id;

  const result = await AuthorModel.findOne({ _id: authorID });
  if (!result)
    return res.status(StatusCodes.NOT_FOUND).send("No Author with this ID");

  res.status(StatusCodes.OK).json(result);
});

exports.deleteAuthor = asyncErrHandler(async (req, res, next) => {
  const authorID = req.params.id;

  const result = await AuthorModel.findOneAndRemove({ _id: authorID });

  if (!result) res.status(StatusCodes.NOT_FOUND).json("your target not found");
  else res.status(StatusCodes.OK).json("Author deleted successfully");
});

exports.updateAuthor = asyncErrHandler(async (req, res, next) => {
  const payload = req.body;
  const authorID = req.params.id;

  let currentAuthor = await AuthorModel.findOne({ _id: authorID });

  if (!currentAuthor) {
    res.status(StatusCodes.NOT_FOUND).json("your target not found");
  } else {
    currentAuthor.name = payload.name ? payload.name : currentAuthor.name;
    currentAuthor.jobTitle = payload.jobTitle
      ? payload.jobTitle
      : currentAuthor.jobTitle;

    const updatedAuthor = await currentAuthor.save();
    res.status(StatusCodes.OK).json(updatedAuthor);
  }
});
