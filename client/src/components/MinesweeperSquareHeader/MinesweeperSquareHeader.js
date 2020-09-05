import React from 'react';
import MinesweeperSquareHeaderStyles from './MinesweeperSquareHeader.module.css'
import Button from '../Button/Button';
import Timer from '../Timer/Timer';

const MinesweeperSquareHeader = React.memo((props) => {

  return (
    <div className={MinesweeperSquareHeaderStyles.Header}>
      <p>Mines: {props.mines}</p>
      <Button onClick={props.handleReset}>
        Reset
      </Button>
      <Timer timeStatus={props.timeStatus} />
    </div>
  );
})

export default MinesweeperSquareHeader;