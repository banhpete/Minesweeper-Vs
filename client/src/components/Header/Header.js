import React from 'react';
import { Link } from 'react-router-dom'
import HeaderStyles from './Header.module.css'

const Header = () => {
  return (
    <div className={HeaderStyles.Header}>
      <div className={HeaderStyles.titleCenter}>
        <Link to="/"><h1 className={HeaderStyles.title}>Minesweeper vs</h1></Link>
      </div>
    </div>
  );
}

export default Header;