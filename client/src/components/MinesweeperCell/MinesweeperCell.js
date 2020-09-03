import React from 'react';
import MinesweepercellStyles from './MinesweeperCell.module.css'

const MinesweeperCell = (props) => {

  let cell = null
  if (props.children === 0) {
    cell =
      <div index={props.index} style={{ height: props.side, width: props.side }} onClick={props.onClick} onContextMenu={props.onContextMenu} className={MinesweepercellStyles.Cell}></div>
  } else if (props.children === -1) {
    cell =
      <div index={props.index} style={{ height: props.side, width: props.side }} onClick={props.onClick} onContextMenu={props.onContextMenu} className={`${MinesweepercellStyles.Cell} ${MinesweepercellStyles.Mine}`}>
        {props.children}
      </div>
  } else if (props.children > 0) {
    cell =
      <div index={props.index} style={{ height: props.side, width: props.side }} onClick={props.onClick} onContextMenu={props.onContextMenu} className={MinesweepercellStyles.Cell}>
        {props.children}
      </div>
  } else if (props.children === 'f') {
    cell = <div index={props.index} style={{ background: 'black', color: 'white', height: props.side, width: props.side }} onClick={props.onClick} onContextMenu={props.onContextMenu} className={MinesweepercellStyles.Cell}>f</div>
  } else {
    cell =
      <div index={props.index} style={{ height: props.side, width: props.side }} onClick={props.onClick} onContextMenu={props.onContextMenu} className={`${MinesweepercellStyles.Cell} ${MinesweepercellStyles.Unopened}`}>
      </div>
  }

  return (cell)
}

export default MinesweeperCell;