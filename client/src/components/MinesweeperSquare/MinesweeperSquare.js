import React, { useState, useEffect } from 'react';
import MinesweeperSquareStyles from './MinesweeperSquare.module.css'
import MinesweeperCell from '../MinesweeperCell/MinesweeperCell';

const MinesweeperSquare = React.memo((props) => {
  const [gameGrid, setGameGrid] = useState(props.gameMaster.provideGameGrid())
  const [bol, forceSquareUpdate] = useState(false)

  const Cells = []
  var side = 0;
  if (props.diff === "Easy") { side = 60 }
  else if (props.diff === "Normal") { side = 33.34 }
  else if (props.diff === "Hard") { side = 25 }

  useEffect(() => {
    setGameGrid(props.gameMaster.provideGameGrid())
  }, [props.diff])

  for (let i = 0; i < gameGrid.length; i++) {
    for (let j = 0; j < gameGrid[0].length; j++) {
      Cells.push(
        <MinesweeperCell
          key={`${i}-${j}`}
          side={side}
          onClick={() => { props.timeStart(); setGameGrid(props.gameMaster.cellClick(i, j)); forceSquareUpdate(!bol) }}>{gameGrid[i][j]}
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