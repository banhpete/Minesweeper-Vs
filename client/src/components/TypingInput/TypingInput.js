import React from 'react';
import InputStyles from './TypingInput.module.css'

const Input = (props) => {
  return (
    <input
      name={props.name}
      className={InputStyles.Input}
      type={props.type}
      style={props.style}
      value={props.value}
      onChange={props.onChange}
      autoComplete="off"
    >
    </input>
  );
}

export default Input;