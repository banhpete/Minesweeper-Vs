import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import PopupMenuStyles from './PopupMenu.module.css'
import Button from '../Button/Button';
import Input from '../TypingInput/TypingInput';

const PopupMenu = (props) => {
  const [roomId, setRoomId] = useState('')
  let randomId = "";
  while (randomId.length < 4) {
    randomId += String.fromCharCode((Math.random() * 26) + 65)
  }

  return (
    <div className={PopupMenuStyles.Container}>
      <div className={PopupMenuStyles.PopupMenu}>
        <h3 className={PopupMenuStyles.Title}>Minehunter</h3>
        <Link to={`/game/${props.gameMode}?roomid=${randomId}`}><Button style={{ margin: '15px auto', height: 25 }}>Create Room</Button></Link>
        <h4 className={PopupMenuStyles.SubTitle}>OR</h4>
        <div className={PopupMenuStyles.Row}>
          <Link to={`/game/${props.gameMode}?roomid=${roomId}`}><Button style={{ margin: '15px 5px', height: 25, display: 'inline-block' }}>Join Room</Button></Link>
          <Input onChange={(e) => { console.log('hi'); setRoomId(e.target.value) }} style={{ width: 100, height: 25, margin: '15px 5px', display: 'inline-block' }}></Input>
        </div>
        <h4 onClick={props.onClick} className={PopupMenuStyles.Cancel}>X</h4>
      </div>
    </div>
  );
}

export default PopupMenu;