import React from 'react';
import MinesweepercellStyles from './MinesweeperCell.module.css'

const MinesweeperCell = (props) => {

  let numColours = {
    1: '#0000ff',
    2: '#008000',
    3: '#ff0000',
    4: '#000080',
    5: '#800000',
    6: '#008080',
    7: '#000000',
    8: '#808080'
  }

  let color = { color: numColours[props.children] }

  let cell = null
  if (props.children === 0) {
    cell =
      <div
        index={props.index}
        style={{ height: props.side, width: props.side }}
        onClick={props.onClick}
        onContextMenu={props.onContextMenu}
        className={`${MinesweepercellStyles.Cell} ${MinesweepercellStyles.Opened}`}>
      </div>
  } else if (props.children === -1) {
    cell =
      <div index={props.index}
        style={{ height: props.side, width: props.side }}
        onClick={props.onClick}
        onContextMenu={props.onContextMenu}
        className={`${MinesweepercellStyles.Cell} ${MinesweepercellStyles.Mine}`}>
      </div>
  } else if (props.children > 0) {
    cell =
      <div
        index={props.index}
        style={{ height: props.side, width: props.side }}
        onClick={props.onClick}
        onContextMenu={props.onContextMenu}
        className={`${MinesweepercellStyles.Cell} ${MinesweepercellStyles.Opened}`}>
        <a style={color}>{props.children}</a>
      </div>
  } else if (props.children === 'f') {
    cell = <div
      index={props.index}
      className={`${MinesweepercellStyles.Cell} ${MinesweepercellStyles.Flag}`}
      style={{ height: props.side, width: props.side }}
      onClick={props.onClick}
      onContextMenu={props.onContextMenu && props.onContextMenu}
    >
    </div>
  } else {
    cell =
      <div
        index={props.index}
        style={{ height: props.side, width: props.side }}
        onClick={props.onClick}
        onContextMenu={props.onContextMenu}
        className={`${MinesweepercellStyles.Cell} 
        ${MinesweepercellStyles.Unopened}`}>
      </div>
  }

  return (cell)
}

export default MinesweeperCell;