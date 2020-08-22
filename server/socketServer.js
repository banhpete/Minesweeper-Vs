const http = require('http')
const app = require('./server')
const socketio = require('socket.io')

const socketServerData = require('./socketServerData')

const server = http.createServer(app)
const io = socketio(server)

io.on('connect', (socket) => {
  socket.emit('totalConnections', { totalConnections: socketServerData.addConnection() })
  socket.broadcast.emit('totalConnections', { totalConnections: socketServerData.getConnections() })


  socket.on('disconnect', () => {
    socketServerData.removeConnection();
    socket.broadcast.emit('totalConnections', { totalConnections: socketServerData.getConnections() })
  })
})

const PORT = process.env.PORT || 3001
server.listen(PORT, function () {
  console.log(`Listening on PORT ${PORT}`)
})