var totalConnections = 0;
var usersInRoom = {};

function addConnection() {
  return ++totalConnections;
}

function getConnections() {
  return totalConnections;
}

function removeConnection() {
  return --totalConnections;
}

function addUserToRoom(userId, roomId) {
  usersInRoom[userId] = roomId
}

function removeUserFromRoom(userId) {
  let roomId = usersInRoom[userId]
  delete usersInRoom[userId]
  return roomId
}

module.exports = { addConnection, removeConnection, getConnections, addUserToRoom, removeUserFromRoom } 