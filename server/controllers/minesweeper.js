const { addSquare } = require('../data/minesweeperData');

const gameSetting = {
  Easy: {
    gridX: 10, gridY: 8, numOfMines: 10, squareSize: 60
  },
  Normal: {
    gridX: 18, gridY: 14, numOfMines: 40, squareSize: 33
  },
  Hard: {
    gridX: 24, gridY: 20, numOfMines: 99, squareSize: 25
  },
}

function checkSurroundings(y, x, gridY, gridX, fn) {
  for (let dx = -1; dx <= 1; dx++) {
    if (x + dx >= 0 && x + dx < gridX) {
      for (let dy = -1; dy <= 1; dy++) {
        if (y + dy >= 0 && y + dy < gridY) {
          fn(y + dy, x + dx);
        }
      }
    }
  }
}

function gridGen(req, res, next) {
  var gridValues = [];
  var gridY = gameSetting[req.body.diff].gridY;
  var gridX = gameSetting[req.body.diff].gridX;
  var numOfMines = gameSetting[req.body.diff].numOfMines;

  for (let y = 0; y < gridY; y++) {
    let valueRow = [];
    for (let x = 0; x < gridX; x++) {
      valueRow.push(0)
    }
    gridValues.push(valueRow);
  }

  for (let minesAdded = 0; minesAdded < numOfMines; minesAdded++) {
    let randX = Math.floor(Math.random() * gridX);
    let randY = Math.floor(Math.random() * gridY);

    while (gridValues[randY][randX] === -1) {
      randX = Math.floor(Math.random() * gridX);
      randY = Math.floor(Math.random() * gridY);
    }

    gridValues[randY][randX] = -1;
    checkSurroundings(randY, randX, gridY, gridX, function (y, x) {
      if (gridValues[y][x] !== -1) {
        gridValues[y][x]++;
      }
    });
  }

  res.json(gridValues)
}

function save(req, res, next) {
  var gridId = ""
  req.body.valueGrid.forEach((row) => {
    gridId = gridId + row[0];
  })
  addSquare(req.session.id, gridId)
  res.send(JSON.stringify({ gridId }))
}

module.exports = { gridGen, save }