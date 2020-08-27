import React, { useState, useEffect } from 'react';
import MinesweeperSquareStyles from './MinesweeperSquare.module.css'
import MinesweeperCell from '../MinesweeperCell/MinesweeperCell';

const MinesweeperSquare = React.memo((props) => {
  const [gameGrid, setGameGrid] = useState(props.gameMaster.provideGameGrid())
  const [bol, forceSquareUpdate] = useState(false)

  useEffect(() => {
    setGameGrid(props.gameMaster.provideGameGrid())
  }, [props.diff, props.forceUpdate, props.gameMaster])

  useEffect(() => {
    if (props.gameMaster.provideGameEnd()) {
      props.gameEnd()
    }
  })

  const handleClick = (i, j) => {
    props.timeStart();
    setGameGrid(props.gameMaster.cellClick(i, j));
    forceSquareUpdate(!bol)
  }

  var side = 0;
  if (props.diff === "Easy") { side = 60 }
  else if (props.diff === "Normal") { side = 33.33 }
  else if (props.diff === "Hard") { side = 25 }

  const Cells = []
  for (let i = 0; i < gameGrid.length; i++) {
    for (let j = 0; j < gameGrid[0].length; j++) {
      Cells.push(
        <MinesweeperCell
          key={`${i}-${j}`}
          side={side}
          onClick={() => { handleClick(i, j) }}>{gameGrid[i][j]}
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
