import React from 'react';
import MinesweepercellStyles from './MinesweeperCell.module.css'

const MinesweeperCell = (props) => {

  let cell = null
  if (props.children === 0) {
    cell =
      <div style={{ height: props.side, width: props.side }} onClick={props.onClick} className={MinesweepercellStyles.Cell}></div>
  } else if (props.children === -1) {
    cell =
      <div style={{ height: props.side, width: props.side }} onClick={props.onClick} className={`${MinesweepercellStyles.Cell} ${MinesweepercellStyles.Mine}`}>
        {props.children}
      </div>
  } else if (props.children > 0) {
    cell =
      <div style={{ height: props.side, width: props.side }} onClick={props.onClick} className={MinesweepercellStyles.Cell}>
        {props.children}
      </div>
  } else {
    cell =
      <div style={{ height: props.side, width: props.side }} onClick={props.onClick} className={`${MinesweepercellStyles.Cell} ${MinesweepercellStyles.Unopened}`}>
      </div>
  }

  return (cell)
}

export default MinesweeperCell;