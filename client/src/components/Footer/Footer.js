import React from 'react';
import FooterStyles from './Footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <div className={FooterStyles.Footer}>
      <p>Made By Peter Banh</p>
      <a href="https://www.linkedin.com/in/peter-banh/"> <FontAwesomeIcon size='lg' icon={faLinkedin} /></a>
      <a href="https://github.com/banhpete/Minesweeper-Vs"> <FontAwesomeIcon size='lg' icon={faGithubSquare} /></a>
    </div>
  );
}

export default Footer;