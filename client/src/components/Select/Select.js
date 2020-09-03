import React from 'react';
import SelectStyles from './Select.module.css'

const Select = (props) => {
  var options = [];

  /* ---- Deciding Default Value ------------------------------------------------------------------------------------------------ */
  if (props.initial) options.push(<option key="initial" value={props.initial} disabled={true}>{props.initial}</option>)

  /* ---- Adding options ------------------------------------------------------------------------------------------------ */
  props.options.forEach((option) => {
    options.push(<option key={option} value={option}>{option}</option>)
  })

  return (
    <select
      defaultValue={props.initial ? props.initial : null}
      onChange={props.handleChange}
      className={SelectStyles.Select}
      style={props.style}
    >
      {options}
    </select>
  );
}

export default Select;