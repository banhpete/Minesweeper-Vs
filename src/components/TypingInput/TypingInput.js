import React from 'react';
import InputStyles from './TypingInput.module.css'

const Input = (props) => {
  return (
    <input className={InputStyles.Input} type={props.type}></input>
  );
}

export default Input;