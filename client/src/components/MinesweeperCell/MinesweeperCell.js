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
  let otherPlayerColor = (props.player === 'player1') ? numColours[2] : numColours[1];
  let selected = props.otherPlayerEnter ? { boxShadow: 'inset 0px 0px 1px 2px ' + otherPlayerColor } : {};
  let indices = props.index.split('-')
  let animationDelay = Math.max(Math.abs(props.lastClick[0] - indices[0]), Math.abs(props.lastClick[1] - indices[1])) * 40;
  let cell = null
  if (props.children === 0) {
    cell =
      <div
        index={props.index}
        style={{ height: props.side, width: props.side, animationDelay: animationDelay + 'ms', ...selected }}
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        className={`${MinesweepercellStyles.Cell} ${MinesweepercellStyles.Opened}`}>
      </div>
  } else if (props.children === -1) {
    cell =
      <div index={props.index}
        style={{ height: props.side, width: props.side, ...selected }}
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        className={`${MinesweepercellStyles.Cell} ${MinesweepercellStyles.Mine}`}>
      </div>
  } else if (props.children > 0) {
    cell =
      <div
        index={props.index}
        style={{ height: props.side, width: props.side, animationDelay: animationDelay + 'ms', ...selected }}
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        onContextMenu={props.onContextMenu}
        className={`${MinesweepercellStyles.Cell} ${MinesweepercellStyles.Opened}`}>
        <span style={color}>{props.children}</span>
      </div>
  } else if (props.children === 'f' || props.isflag) {
    cell = <div
      index={props.index}
      className={`${MinesweepercellStyles.Cell} ${MinesweepercellStyles.Flag}`}
      style={{ height: props.side, width: props.side, ...selected }}
      onClick={props.onClick}
      onMouseEnter={(props.onMouseEnter)}
      onContextMenu={props.onContextMenu && props.onContextMenu}
    >
    </div>
  } else {
    cell =
      <div
        index={props.index}
        style={{ height: props.side, width: props.side, ...selected }}
        onClick={props.onClick}
        onMouseEnter={(props.onMouseEnter)}
        onContextMenu={props.onContextMenu}
        className={`${MinesweepercellStyles.Cell} 
        ${MinesweepercellStyles.Unopened}`}>
      </div>
  }

  return (cell)
}

export default MinesweeperCell;