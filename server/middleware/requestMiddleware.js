function checkOrigin(req, res, next) {
  if (req.headers.origin === process.env.ORIGIN) {
    next();
  } else {
    let error = new Error("Cannot not process request");
    error.statusCode = 400;
    next(error);
  }
}

module.exports = { checkOrigin }