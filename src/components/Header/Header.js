import React from 'react';
import HeaderStyles from './Header.module.css'

const Header = () => {
  return (
    <div className={HeaderStyles.Header}>
      <div className={HeaderStyles.titleCenter}>
        <h1 className={HeaderStyles.title}>Minesweeper vs</h1>
      </div>
    </div>
  );
}

export default Header;