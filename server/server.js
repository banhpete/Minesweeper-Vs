// Import modules
const http = require('http')
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const psql = require('./db')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)

// Configurement
require('dotenv').config()

// Import routes
const userRoute = require('./routes/user')
const minesweeperRoute = require('./routes/minesweeper')
const scoresRoute = require('./routes/scores')

// Implementing Middleware
const app = express()
app.use(session({
  store: new pgSession({
    pool: psql,
    tableName: 'user_sessions'
  }),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static(path.join(__dirname.replace('server', ''), 'client', 'build')))

// Setting Routes
app.use('/user', userRoute)
app.use('/minesweeper', minesweeperRoute)
app.use('/scores', scoresRoute)

// Serving React App
app.get('/*', function (req, res, next) {
  res.status(200).sendFile(path.join(__dirname.replace('server', ''), 'client', 'build', 'index.html'))
})

// Error Handling
app.use(function (error, req, res, next) {
  if (!error.statusCode) error.statusCode = 500;

  console.log(error.toString())

  return res
    .status(error.statusCode)
    .json({ error: error.message.toString() })
})

module.exports = app;