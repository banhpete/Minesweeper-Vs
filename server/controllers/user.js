const psqlClient = require('../db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const saltRounds = 8;

function createJWT(username) {
  return jwt.sign({ username }, process.env.SECRET, { expiresIn: '24h' })
}

async function userCreate(req, res, next) {
  const regExChar = /[A-Za-z0-9_-]$/
  const regExLength = /.{5,20}$/
  const regExEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  // Validating user inputs - Validation done on both client and server sides just incase
  var error = null;
  if (!regExChar.test(req.body.username)) {
    error = new Error("Username cannot have any punctuation or symbols")
  } else if (!regExLength.test(req.body.username)) {
    error = new Error("Username shall be between 5-20 chracters")
  } else if (!regExEmail.test(req.body.email)) {
    error = new Error("Email provided is not a valid email")
  } else if (!regExLength.test(req.body.password)) {
    error = new Error("Password shall be between 5-20 characters")
  }
  if (error) {
    error.statusCode = 400;
    return next(error)
  }

  // Password Hashing Promise
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds)

  // psql query
  try {
    const query = 'INSERT INTO users (username, password, email) VALUES ($1, $2, $3)'
    const values = [req.body.username, passwordHash, req.body.email]
    const newUser = await psqlClient.query(query, values)

    const token = createJWT(req.body.username)

    return res.json({ token })
  } catch (error) {
    if (error.message.toString().includes('unique-username')) {
      error.message = "Username has already been taken"
      error.statusCode = 400;
    } else if (error.message.toString().includes('unique-email')) {
      error.message = "Email is registered to a different account"
      error.statusCode = 400;
    }
    return next(error)
  }

}

module.exports = { userCreate } 