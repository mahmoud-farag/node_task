const express = require("express");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const { StatusCodes } = require("http-status-codes");
const AuthorModel = require("../models/authorModel.js");
const isEmailValid = require("../middlewares/isEmailValid.js");

const authRoute = express.Router();

authRoute.post("/login", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(StatusCodes.BAD_REQUEST).json("Please provide an email");
  }

  if (!isEmailValid(email)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json("your email is not valid please try again");
  }

  try {
    const author = await AuthorModel.findOne({ email: email });

    if (!author) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json("this author not exist or your provided email incorrect");
    }
    console.log("jwt" + process.env.JWT_SECRET);

    const token = jwt.sign({ email: author.email }, process.env.JWT_SECRET);
    return res.status(StatusCodes.OK).setHeader("token", token).json(author);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ ErrorMessage: err.message });
  }
});

module.exports = authRoute;
