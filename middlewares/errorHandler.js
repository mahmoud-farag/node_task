const { StatusCodes } = require("http-status-codes");

const asyncErrHandler = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ ErrorMessage: err.message });
    }
  };
};

module.exports = asyncErrHandler;
