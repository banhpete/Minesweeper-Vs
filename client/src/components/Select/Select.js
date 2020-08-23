import React from 'react';
import SelectStyles from './Select.module.css'

const Select = (props) => {
  const options = []

  if (props.initial) options.push(<option key="initial" value={props.initial} disabled={true}>{props.initial}</option>)

  props.options.forEach((option) => {
    options.push(<option key={option} value={option}>{option}</option>)
  })

  return (
    <div className={SelectStyles.Container} style={{ ...props.style }}>
      <label>Game Difficulty</label>
      <select defaultValue={props.initial ? props.initial : null} onChange={props.handleChange} className={SelectStyles.Select}>
        {options}
      </select>
    </div>
  );
}

export default Select;