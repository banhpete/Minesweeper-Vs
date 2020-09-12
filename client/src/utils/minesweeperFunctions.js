const BASE_URL = '/minesweeper'

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

  /* ---- State ------------------------------------------------------------------------------------------------ */
  var valueGrid = [];
  var gameGrid = [];
  var gameEnd = false;
  var numOfMines;
  var remainingSquares;
  var playerWin = false;
  var gameStartTime;
  var gameEndTime;
  var diff;
  var gridId;

  /* ---- Private Functions ------------------------------------------------------------------------------------------------ */
  // Function to check surrounding area of one cell and run function at each cell. Used as part of different functions.
  function checkSurroundings(y, x, fn) {
    for (let dx = -1; dx <= 1; dx++) {
      if (x + dx >= 0 && x + dx < valueGrid[0].length) {
        for (let dy = -1; dy <= 1; dy++) {
          if (y + dy >= 0 && y + dy < valueGrid.length) {
            fn(y + dy, x + dx);
          }
        }
      }
    }
  }

  // Propagate the uncovering of cells that are empty
  function floodFill(y, x) {
    gameGrid[y][x] = valueGrid[y][x]
    remainingSquares--;
    checkSurroundings(y, x, function (y2, x2) {
      if (gameGrid[y2][x2] === "" && valueGrid[y2][x2] !== -1) {
        if (valueGrid[y2][x2] > 0) {
          gameGrid[y2][x2] = valueGrid[y2][x2]
          remainingSquares--;
        } else {
          floodFill(y2, x2)
        }
      }
    });
  }

  // Logic to check if player won or not
  function didPlayerWin() {
    if (remainingSquares === 0) {
      gameEnd = true;
      playerWin = true;
      gameEndTime = Date.now();
    }
  }

  // Logic to ensure that the player's first move does not result in a lost. Only runs once during a game.
  function moveMines(y, x) {
    checkSurroundings(y, x, (y2, x2) => {
      if (valueGrid[y2][x2] === -1) {
        // Mine found in area around y, x - Therefore remove
        valueGrid[y2][x2] = 0;
        // Find random location for mine where it is not in original area (3 by 3 with y,x in the middle)
        let randY = Math.floor(Math.random() * valueGrid.length);
        let randX = Math.floor(Math.random() * valueGrid[0].length);
        while (valueGrid[randY][randX] === -1 || Math.abs(randY - y) <= 1 || Math.abs(randX - x) <= 1) {
          randY = Math.floor(Math.random() * valueGrid.length);
          randX = Math.floor(Math.random() * valueGrid[0].length);
        }
        // Place new mine and update the surrounding area
        valueGrid[randY][randX] = -1;
        checkSurroundings(randY, randX, (y3, x3) => {
          if (valueGrid[y3][x3] !== -1) {
            valueGrid[y3][x3]++;
          }
        })
        // Update the area of removed mine
        checkSurroundings(y2, x2, (y3, x3) => {
          if (valueGrid[y3][x3] === -1) {
            valueGrid[y2][x2]++;
          }
          if (valueGrid[y3][x3] > 0 && !(y3 === y2 && x3 === x2)) {
            valueGrid[y3][x3]--;
          }
        })
      }
    })
  }

  async function saveId() {
    const response = await fetch(BASE_URL + '/save', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ valueGrid })
    })
    const responseData = await response.json()
    gridId = responseData.gridId
  }

  /* ---- Public Functions ------------------------------------------------------------------------------------------------ */
  function cellClick(y, x, cb) {
    if (!gameStartTime) {
      gameStartTime = Date.now();
      moveMines(y, x);
      saveId();
    }
    if (!gameEnd && gameGrid[y][x] === "") {
      if (valueGrid[y][x] === -1) {
        gameEnd = true;
        gameEndTime = Date.now();
        gameGrid[y][x] = valueGrid[y][x]
        cb();
        return
      }
      if (valueGrid[y][x] > 0) {
        gameGrid[y][x] = valueGrid[y][x]
        remainingSquares--;
        didPlayerWin();
        cb()
        return
      }
      floodFill(y, x)
      didPlayerWin();
      cb()
      return
    }
    return
  }

  function cellRightClick(y, x, cb) {
    if (!gameEnd) {
      if (gameGrid[y][x] === 'f') {
        gameGrid[y][x] = ""
      } else if (gameGrid[y][x] === "") {
        gameGrid[y][x] = "f"
      }
      cb()
    }
    return
  }

  async function gridGen(newDiff, cb) {
    gameEnd = false;
    playerWin = false;
    gameStartTime = null;
    gameEndTime = null;
    if (newDiff) {
      diff = newDiff;
      numOfMines = gameSettings[diff].numOfMines;
    }
    remainingSquares = gameSettings[diff].gridX * gameSettings[diff].gridY - numOfMines;
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ diff })
    })
    valueGrid = await response.json()
    gameGrid = [];
    for (let i = 0; i < valueGrid.length; i++) {
      let gameGridRow = [];
      for (let j = 0; j < valueGrid[0].length; j++) {
        gameGridRow.push("")
      }
      gameGrid.push(gameGridRow)
    }
    cb()
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

  function provideDiff() {
    return diff;
  }

  function provideTime() {
    return Math.floor((gameEndTime - gameStartTime) / 1000)
  }

  function provideGridId() {
    return gridId
  }

  /* ---- Test Function Only for Development ------------------------------------------------------------------------------------------------ */
  // var gridTest = (arr) => {
  //   let errorFound = false;
  //   for (let i = 0; i < arr.length; i++) {
  //     for (let j = 0; j < arr[0].length; j++) {
  //       if (arr[i][j] > 0) {
  //         let count = 0;
  //         checkSurroundings(i, j, (i2, j2) => {
  //           if (arr[i2][j2] === -1) {
  //             count++
  //           }
  //         })
  //         if (arr[i][j] !== count) {
  //           errorFound = true;
  //           console.log(`Error at ${i} ${j}`)
  //         }
  //       } else if (arr[i][j] === -1) {
  //         checkSurroundings(i, j, (i2, j2) => {
  //           if (arr[i2][j2] === 0) {
  //             errorFound = true
  //             console.log(`Error at ${i} ${j}`)
  //           }
  //         })
  //       }
  //     }
  //   }
  //   if (errorFound) console.log("There was an error");
  //   else console.log("No Error")
  // }

  return { provideGameGrid, provideNumOfMines, provideGameEnd, providePlayerWinStatus, provideDiff, provideTime, provideGridId, cellClick, cellRightClick, gridGen }
}

export default gameMasterGen