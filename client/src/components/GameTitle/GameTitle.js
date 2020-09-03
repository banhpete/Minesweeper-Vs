import React from 'react';
import GameTitleStyles from './GameTitle.module.css'

const GameTitle = ({ title, subtitle }) => {
  return (
    <div>
      <h2 className={GameTitleStyles.title1}>{title}</h2>
      {subtitle ? <h3 className={GameTitleStyles.title2}>{subtitle}</h3> : null}
    </div>);
}

export default GameTitle;