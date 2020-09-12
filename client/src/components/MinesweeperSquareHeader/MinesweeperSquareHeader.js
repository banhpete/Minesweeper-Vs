import React from 'react';
import MinesweeperSquareHeaderStyles from './MinesweeperSquareHeader.module.css'
import Button from '../Button/Button';
import Timer from '../Timer/Timer';

const MinesweeperSquareHeader = React.memo((props) => {

  let leftCorner = null;
  let rightCorner = null;

  if (props.gameScores) {
    leftCorner = <p>P1 Mines: {props.gameScores['player1']}</p>
    rightCorner = <p>P2 Mines: {props.gameScores['player2']}</p>
  } else {
    leftCorner = <p>Mines: {props.mines}</p>
    rightCorner = <Timer time={props.time} timeStatus={props.timeStatus} />
  }

  return (
    <div className={MinesweeperSquareHeaderStyles.Header}>
      {leftCorner}
      <Button onClick={props.handleReset}>
        Reset
      </Button>
      {rightCorner}
    </div>
  );
}, checkProps)

function checkProps(prevProps, nextProps) {
  if (nextProps.gameScores || nextProps.timeStatus != prevProps.timeStatus) {
    return false;
  }
  return true
}

export default MinesweeperSquareHeader;