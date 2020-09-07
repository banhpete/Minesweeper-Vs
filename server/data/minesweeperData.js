var minesweeperData = [];

function addSquare(sid, gridId) {
  minesweeperData[sid] = { gridId, started: Date.now() }
}

function checkSquare(sid, gridId) {
  if (minesweeperData[sid]) {
    if (minesweeperData[sid].gridId === gridId) {
      minesweeperData[sid].gridId = "";
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

module.exports = { addSquare, checkSquare }