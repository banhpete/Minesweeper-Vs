import React from 'react';
import InputStyles from './TypingInput.module.css'

const Input = (props) => {
  return (
    <input
      name={props.name}
      className={InputStyles.Input}
      type={props.type}
      value={props.value}
      onChange={props.handleChange}
      autoComplete="off"
    >
    </input>
  );
}

export default Input;