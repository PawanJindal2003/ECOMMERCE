const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong mongoDb ID error(cast error)
  if (err.name === "CastError") {
    const message = `resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new (ErrorHandler(message, 400))();
  }

  // Wrong JWT error
  if (err.code === "JsonWebTokenError") {
    const message = `JSON web token is invalid, try again `;
    err = new (ErrorHandler(message, 400))();
  }

  // JWT expire error
  if (err.code === "TokenExpiredError") {
    const message = `JSON web token is expired, try again `;
    err = new (ErrorHandler(message, 400))();
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.stack,
  });
};
