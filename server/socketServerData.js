var totalConnections = 0;
var users = [];

function addConnection() {
  return ++totalConnections;
}

function getConnections() {
  return totalConnections;
}

function removeConnection() {
  return --totalConnections;
}

module.exports = { addConnection, removeConnection, getConnections } 