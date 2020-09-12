import React from 'react';
import FooterStyles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={FooterStyles.Footer}>
      <p>Made By Peter Banh</p>
      <a href="https://www.linkedin.com/in/peter-banh/"><i class="fa fa-linkedin-square" style={{ fontSize: 25 }}></i></a>
      <a href="https://github.com/banhpete/Minesweeper-Vs"><i class="fa fa-github-square" style={{ fontSize: 25 }}></i></a>
    </div>
  );
}

export default Footer;