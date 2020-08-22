// Import modules
const http = require('http')
const express = require('express')
const morgan = require('morgan')

// Configurement
require('dotenv').config()

// Import routes
const userRoute = require('./routes/user')

// Implementing Middleware
const app = express()
app.use(morgan('dev'))
app.use(express.json())

// Setting Routes
app.use('/user', userRoute)

// Error Handling
app.use(function (error, req, res, next) {
  if (!error.statusCode) error.statusCode = 500;

  console.log(error.toString())

  return res
    .status(error.statusCode)
    .json({ error: error.message.toString() })
})

module.exports = app;