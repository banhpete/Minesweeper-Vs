import { openCellAudio } from './audioServices'
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
  var playerWin = false;
  var diff;
  var gridId;
  var gameScores = { player1: 0, player2: 0 };

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
    checkSurroundings(y, x, function (y2, x2) {
      if (gameGrid[y2][x2] === "" && valueGrid[y2][x2] !== -1) {
        if (valueGrid[y2][x2] > 0) {
          gameGrid[y2][x2] = valueGrid[y2][x2]
        } else {
          floodFill(y2, x2)
        }
      }
    });
  }

  // Logic to check if player won or not
  function didPlayerWin() {
    if (gameScores['player1'] === ((numOfMines / 2) + 1)
      || gameScores['player2'] === ((numOfMines / 2) + 1)
      || gameScores['player1'] + gameScores['player2'] === numOfMines) {
      gameEnd = true;
    }
  }

  /* ---- Public Functions ------------------------------------------------------------------------------------------------ */
  function cellClick(y, x, player, cb) {
    if (!gameEnd && gameGrid[y][x] === "") {

      openCellAudio();

      if (valueGrid[y][x] === -1) {
        gameGrid[y][x] = valueGrid[y][x]
        gameScores[player] += 1;
        cb(true);
        didPlayerWin()
        return
      }
      if (valueGrid[y][x] > 0) {
        gameGrid[y][x] = valueGrid[y][x]
        didPlayerWin();
        cb(false)
        return
      }
      floodFill(y, x)
      didPlayerWin();
      cb(false)
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
    if (newDiff) {
      diff = newDiff;
      numOfMines = gameSettings[diff].numOfMines;
    }
    gameScores = { player1: 0, player2: 0 };
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
    cb(valueGrid, diff)
  }

  function giveGrid(grid, newDiff) {
    gameEnd = false;
    playerWin = false;
    valueGrid = grid;
    diff = newDiff;
    numOfMines = gameSettings[diff].numOfMines;
    gameGrid = [];
    gameScores = { player1: 0, player2: 0 };
    for (let i = 0; i < valueGrid.length; i++) {
      let gameGridRow = [];
      for (let j = 0; j < valueGrid[0].length; j++) {
        gameGridRow.push("")
      }
      gameGrid.push(gameGridRow)
    }
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

  function provideGridId() {
    return gridId
  }

  function provideScore(player = null) {
    if (player) {
      return gameScores[player]
    }
    return gameScores
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

  return {
    provideGameGrid,
    provideNumOfMines,
    provideGameEnd,
    providePlayerWinStatus,
    provideDiff,
    provideGridId,
    provideScore,
    giveGrid,
    cellClick,
    cellRightClick,
    gridGen
  }
}

export default gameMasterGen