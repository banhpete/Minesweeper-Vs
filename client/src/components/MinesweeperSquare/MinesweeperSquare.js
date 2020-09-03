import React, { useState, useEffect } from 'react';
import MinesweeperSquareStyles from './MinesweeperSquare.module.css'
import MinesweeperCell from '../MinesweeperCell/MinesweeperCell';

const MinesweeperSquare = React.memo((props) => {



  /* ---- Select Side Length ------------------------------------------------------------------------------------------------ */
  var side;
  if (props.diff === "Easy") { side = 60 }
  else if (props.diff === "Normal") { side = 33.33 }
  else if (props.diff === "Hard") { side = 25 }

  /* ---- Create Cells ------------------------------------------------------------------------------------------------ */
  var Cells = []
  for (let i = 0; i < props.gameGrid.length; i++) {
    for (let j = 0; j < props.gameGrid[0].length; j++) {
      Cells.push(
        <MinesweeperCell
          index={`${i}-${j}`}
          key={`${i}-${j}`}
          side={side}
          onClick={() => { props.handleSquareClick(i, j) }}
          onContextMenu={(e) => { e.preventDefault(); props.handleSquareRightClick(i, j) }}
        >{props.gameGrid[i][j]}
        </MinesweeperCell>)
    }
  }

  return (
    <div className={MinesweeperSquareStyles.Square}>
      {Cells}
    </div>
  );
})

export default MinesweeperSquare
