import React from 'react';
import ButtonStyle from './Button.module.css'

const Button = (props) => {
  var disabledStatus = null
  if (props.loading) {
    disabledStatus = props.loading
  } else if (props.disabled) {
    disabledStatus = props.disabled
  }
  return (
    <button
      className={props.activated ? ButtonStyle.ButtonActivated : ButtonStyle.Button}
      style={props.style} disabled={disabledStatus}
      onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;