function gameMasterGen() {
  /* -------- GameSettings -------- */
  const gameSettings = {
    Easy: {
      gridX: 10, gridY: 8, numOfMines: 10
    },
    Normal: {
      gridX: 18, gridY: 14, numOfMines: 40
    },
    Hard: {
      gridX: 24, gridY: 20, numOfMines: 99,
    },
  }

  /* -------- Game State -------- */
  var gridValues = [];
  var gameGrid = [];
  var gameEnd = false;
  var numOfMines;
  var remainingSquares;
  var playerWin = false;

  /* -------- Internal Functions -------- */
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

  function floodFill(y, x) {
    gameGrid[y][x] = gridValues[y][x]
    remainingSquares--;
    checkSurroundings(y, x, function (y2, x2) {
      if (gameGrid[y2][x2] === "" && gridValues[y2][x2] !== -1) {
        if (gridValues[y2][x2] > 0) {
          gameGrid[y2][x2] = gridValues[y2][x2]
          remainingSquares--;
          console.log(remainingSquares)
        } else {
          floodFill(y2, x2)
        }
      }
    });
  }

  function didPlayerWin() {
    if (remainingSquares === 0) {
      gameEnd = true;
      playerWin = true;
    }
  }

  /* -------- Public Functions -------- */
  function cellClick(y, x) {
    if (!gameEnd && gameGrid[y][x] === "") {
      if (gridValues[y][x] === -1) { gameEnd = true; didPlayerWin(); return gameGrid }
      if (gridValues[y][x] > 0) {
        gameGrid[y][x] = gridValues[y][x]
        remainingSquares--;
        didPlayerWin();
        return gameGrid
      }
      floodFill(y, x)
      didPlayerWin();
      return gameGrid
    }
    return gameGrid
  }

  async function gridGen(newDiff, cb) {
    gameEnd = false;
    numOfMines = gameSettings[newDiff].numOfMines;
    remainingSquares = gameSettings[newDiff].gridX * gameSettings[newDiff].gridY - numOfMines;
    playerWin = false;
    console.log(remainingSquares)
    const response = await fetch('/minesweeper', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ diff: newDiff })
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
    cb(newDiff)
  }

  async function gridReset(diff, bol, cb) {
    gameEnd = false;
    remainingSquares = gameSettings[diff].gridX * gameSettings[diff].gridY - numOfMines;
    playerWin = false;
    console.log(remainingSquares)
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
    cb(!bol)
  }

  function providePlayerWinStatus() {
    return playerWin;
  }

  function provideGameEnd() {
    return gameEnd
  }

  function provideGameGrid() {
    return gameGrid
  }

  function provideNumOfMines() {
    return numOfMines;
  }

  return { provideGameGrid, provideNumOfMines, provideGameEnd, providePlayerWinStatus, cellClick, gridGen, gridReset }
}

export default gameMasterGen