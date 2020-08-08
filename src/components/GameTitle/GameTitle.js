import React from 'react';
import GameTitleStyles from './GameTitle.module.css'

const GameTitle = () => {
  return (
    <div>
      <h2 className={GameTitleStyles.title1}>Minesweeper Vs.</h2>
      <h3 className={GameTitleStyles.title2}>Online Minesweeper Multiplayer</h3>
    </div>);
}

export default GameTitle;