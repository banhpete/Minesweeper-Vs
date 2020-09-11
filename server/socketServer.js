const http = require('http')
const app = require('./server')
const socketio = require('socket.io')

const socketServerData = require('./data/socketServerData')

const server = http.createServer(app)
const io = socketio(server)

io.on('connect', (socket) => {
  // Handle the total connection numbers
  socket.emit('totalConnections', { totalConnections: socketServerData.addConnection() })
  socket.broadcast.emit('totalConnections', { totalConnections: socketServerData.getConnections() })

  // Handle player joining room
  socket.on('join-room', (roomId, cb) => {
    if (!io.sockets.adapter.rooms[roomId]) {
      socket.join(roomId);
      cb('player1')
    } else if (io.sockets.adapter.rooms[roomId].length < 2) {
      socket.join(roomId);
      cb('player2')
      io.in(roomId).emit('start-game')
    } else {
      console.log('Room is full')
    }
  })

  // Handle player leaving room
  socket.on('leave-room', (roomId, cb) => {
    socket.leave(roomId);
    cb();
  })

  // Handle disconnects
  socket.on('disconnect', () => {
    socketServerData.removeConnection();
    socket.broadcast.emit('totalConnections', { totalConnections: socketServerData.getConnections() })
  })
})

const PORT = process.env.PORT || 3001
server.listen(PORT, function () {
  console.log(`Listening on PORT ${PORT}`)
})