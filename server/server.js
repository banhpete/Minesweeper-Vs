// Import modules
const http = require('http')
const express = require('express')
const morgan = require('morgan')
const path = require('path')

// Configurement
require('dotenv').config()

// Import routes
const userRoute = require('./routes/user')
const minesweeperRoute = require('./routes/minesweeper')
const scoresRoute = require('./routes/scores')


// Implementing Middleware
const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static(path.join(__dirname.replace('server', ''), 'client', 'build')))

// Setting Routes
app.use('/user', userRoute)
app.use('/minesweeper', minesweeperRoute)
app.use('/scores', scoresRoute)

// Serving React App
app.get('/*', function (req, res, next) {
  res.sendFile(path.join(__dirname.replace('server', ''), 'client', 'build', 'index.html'))
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