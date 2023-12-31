const {status} = require("../statusCodes")

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  const stack = process.env.NODE_ENV === 'production' ? null : err.stack
  switch (statusCode) {
    case status.VALIDATION_ERROR:
      res.json({ title:"Validation failed", message: err.message, stackTrace: stack });
      break;
    case status.UNAUTHORIZED:
      res.json({ title:"Authorization failed", message: err.message, stackTrace: stack });
      break;
    case status.FORBIDDEN:
      res.json({ title:"Action Forbidden", message: err.message, stackTrace: stack });
      break;
    case status.NOT_FOUND:
      res.json({ title:"Not Found", message: err.message, stackTrace: stack });
      break;
    case status.SERVER_ERROR:
      res.json({ title:"Server Error", message: err.message, stackTrace: stack });
      break;
    default:
      console.log("No error found!");
      res.json({ title:"Unknown error", message: err.message, stackTrace: stack });
      break;
  }
};

module.exports = errorHandler;