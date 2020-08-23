function gameMasterGen() {
  // /* -------- GameSettings -------- */
  // const gameSetting = {
  //   Easy: {
  //     gridX: 10, gridY: 8, numOfMines: 10, squareSize: 60
  //   },
  //   Normal: {
  //     gridX: 18, gridY: 14, numOfMines: 40, squareSize: 33
  //   },
  //   Hard: {
  //     gridX: 24, gridY: 20, numOfMines: 99, squareSize: 25
  //   },
  // }

  /* -------- Game State -------- */
  var gridValues = [];
  var gameGrid = [];
  var diff = null;

  // /* -------- Create Grids -------- */
  // for (let y = 0; y < 8; y++) {
  //   let valueRow = [];
  //   let gameGridRow = [];
  //   for (let x = 0; x < 10; x++) {
  //     valueRow.push(0)
  //     gameGridRow.push("")
  //   }
  //   gridValues.push(valueRow);
  //   gameGrid.push(gameGridRow);
  // }

  // console.log(gridValues)

  // /* -------- Add values to Grids -------- */
  // for (let minesAdded = 0; minesAdded < 10; minesAdded++) {
  //   let randX = Math.floor(Math.random() * 10);
  //   let randY = Math.floor(Math.random() * 8);

  //   while (gridValues[randY][randX] === -1) {
  //     randX = Math.floor(Math.random() * 10);
  //     randY = Math.floor(Math.random() * 8);
  //   }

  //   gridValues[randY][randX] = -1;
  //   checkSurroundings(randY, randX, function (y, x) {
  //     if (gridValues[y][x] !== -1) {
  //       gridValues[y][x]++;
  //     }
  //   });
  // }

  /* -------- Utility Function -------- */
  function checkSurroundings(y, x, fn) {
    for (let dx = -1; dx <= 1; dx++) {
      if (x + dx >= 0 && x + dx < gridValues[0].length) {
        for (let dy = -1; dy <= 1; dy++) {
          if (y + dy >= 0 && y + dy < gridValues.length) {
            fn(y + dy, x + dx);
          }
        }
      }
    }
  }

  /* -------- Update Grids -------- */
  function floodFill(y, x) {
    gameGrid[y][x] = gridValues[y][x]
    checkSurroundings(y, x, function (y2, x2) {
      if (gameGrid[y2][x2] === "" && gridValues[y2][x2] !== -1) {
        if (gridValues[y2][x2] > 0) {
          gameGrid[y2][x2] = gridValues[y2][x2]
        } else {
          floodFill(y2, x2)
        }
      }
    });
  }

  /* -------- Public Functions -------- */
  function cellClick(y, x) {
    if (gridValues[y][x] === -1) return gameGrid
    if (gridValues[y][x] > 0) {
      gameGrid[y][x] = gridValues[y][x]
      return gameGrid
    }
    floodFill(y, x)
    return gameGrid
  }

  function provideGameGrid() {
    return gameGrid
  }


  async function gridGen(diff, cb) {
    const response = await fetch('/minesweeper', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ diff })
    })
    gridValues = await response.json()
    gameGrid = [];
    for (let i = 0; i < gridValues.length; i++) {
      let gameGridRow = [];
      for (let j = 0; j < gridValues[0].length; j++) {
        gameGridRow.push("")
      }
      gameGrid.push(gameGridRow)
    }
    cb(diff)
  }

  return { provideGameGrid, cellClick, gridGen }
}

export default gameMasterGen