import React from 'react';
import ButtonStyle from './Button.module.css'

const Button = (props) => {
  const buttonStyle = {
    height: props.height,
    width: props.width,
    margin: props.margin,
    fontSize: props.fontSize
  }

  return (
    <button className={ButtonStyle.Button} style={buttonStyle}>{props.children}</button>
  );
}

export default Button;