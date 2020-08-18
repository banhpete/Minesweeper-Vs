import React from 'react';
import SpecialButtonStyle from './SpecialButton.module.css'

const SpecialButton = (props) => {

  const specialButtonStyle = {
    height: props.height,
    width: props.width,
    margin: `0 0`,
    fontSize: props.fontSize,
  }

  const popupStyle = {
    height: props.menuToggle ? props.secondaryHeight : 0,
    top: props.menuToggle ? 0 : -2,
    width: props.width * .8,
  }

  const containerStyle = {
    margin: props.margin,
  }

  return (
    <div className={SpecialButtonStyle.container} style={containerStyle}>
      <button onClick={(e) => { e.stopPropagation(); props.changeButtonState(props.index) }} className={SpecialButtonStyle.Button} style={specialButtonStyle}>{props.children}</button>
      <div
        style={popupStyle}
        className={props.menuToggle ? `${SpecialButtonStyle.popup} ${SpecialButtonStyle.close}` : `${SpecialButtonStyle.popup} ${SpecialButtonStyle.open}`}>
        {props.components}
      </div>
    </div>
  );
}

export default SpecialButton;