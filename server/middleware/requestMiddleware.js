function checkOrigin(req, res, next) {
  console.log(req.headers)
  console.log('Checking Request...')
  if (req.headers.origin === process.env.ORIGIN) {
    console.log('Request Pass')
    next();
  } else {
    console.log('Request Fail')
    let error = new Error("Cannot not process request");
    res.status(400);
    next(error);
  }
}

module.exports = { checkOrigin }