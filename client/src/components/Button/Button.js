import React from 'react';
import ButtonStyle from './Button.module.css'

const Button = (props) => {


  return (
    <button className={ButtonStyle.Button} style={props.style} disabled={props.loading} onClick={props.onClick}>{props.children}</button>
  );
}

export default Button;