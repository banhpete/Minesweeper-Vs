const http = require('http')
const express = require('express')

const app = express()

app.get('/', function (req, res, next) {
  console.log('hello')
  res.send('hello')
})

const PORT = process.env.PORT || 3001
const server = http.createServer(app)
server.listen(PORT, function () {
  console.log(`Listening on PORT ${PORT}`)
})