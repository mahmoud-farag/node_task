const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const AuthorModel = require("../models/authorModel.js");

exports.isAuthorLogin = async (req, res, next) => {
  const { token } = req.headers;
  // token must be in this format --> Bearer gkjfgskgkgdgkdgsj......
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json("you are not logged");
  }

  const tokenValue = token.replace("Bearer", "");

  try {
    const { email } = await jwt.verify(tokenValue, process.env.JWT_SECRET);
    const author = await AuthorModel.findOne({ email });
    req.author = author;
    next();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
