function checkOrigin(req, res, next) {
  if (req.headers.origin === process.env.ORIGIN) {
    next();
  } else {
    console.log(req.headers.origin);
    console.log(process.env.ORIGIN)
    let error = new Error("Cannot not process request");
    res.status(400);
    next(error);
  }
}

module.exports = { checkOrigin }