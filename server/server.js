// Import modules
const http = require('http')
const express = require('express')
const morgan = require('morgan')

// Configurement
require('dotenv').config()
const client = require('./db')

// Import routes
const userRoute = require('./routes/user')

// Implementing Middleware
const app = express()
app.use(morgan('dev'))
app.use(express.json())

// Setting Routes
app.use('/user', userRoute)

app.get('/', async function (req, res, next) {
  const response = await client.query('SELECT * FROM users')
  res.json(response.rows)
})

// Error Handling
app.use(function (error, req, res, next) {
  if (!error.statusCode) error.statusCode = 500;

  console.log(error.toString())

  return res
    .status(error.statusCode)
    .json({ error: error.message.toString() })
})

const PORT = process.env.PORT || 3001
const server = http.createServer(app)
server.listen(PORT, function () {
  console.log(`Listening on PORT ${PORT}`)
})