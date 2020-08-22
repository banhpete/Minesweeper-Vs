var totalConnections = 0;
var users = [];

function addConnection() {
  console.log(totalConnections + 1)
  return ++totalConnections;
}

function getConnections() {
  return totalConnections;
}

function removeConnection() {
  console.log(totalConnections - 1)
  return --totalConnections;
}

module.exports = { addConnection, removeConnection, getConnections } 