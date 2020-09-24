import React from 'react';
import background from "./background.png"

const Background = () => {
  let imgStyle = {
    position: 'relative',
    left: -100,
    width: 2500
  }

  let divStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
    overflow: 'hidden'
  }

  return (<div style={divStyle}><img alt="minesweeper vs background image" style={imgStyle} src={background}></img></div>);
}

export default Background;