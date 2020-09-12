import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import PopupMenuStyles from './PopupMenu.module.css'
import Button from '../Button/Button';
import Input from '../TypingInput/TypingInput';
import { SocketContext } from '../../contexts/SocketContext'

const PopupMenu = (props) => {
  const [roomId, setRoomId] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const context = useContext(SocketContext)

  let randomId = "";
  while (randomId.length < 4) {
    randomId += String.fromCharCode((Math.random() * 26) + 65)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (roomId.length > 4 || roomId.length < 4) {
      setErrMsg('Invalid Room ID')
    } else {
      context.checkRoom(roomId, (roomOpen) => {
        if (roomOpen) {
          props.history.push(`/game/${props.gameMode}?roomid=${roomId}`)
        } else {
          setErrMsg('No one is in that room')
        }
      })
    }
  }

  return (
    <div className={PopupMenuStyles.Container}>
      <div className={PopupMenuStyles.PopupMenu}>
        <h3 className={PopupMenuStyles.Title}>Minehunter</h3>
        <Link to={`/game/${props.gameMode}?roomid=${randomId}`}><Button style={{ margin: '15px auto', height: 25 }}>Create Room</Button></Link>
        <h4 className={PopupMenuStyles.SubTitle}>OR</h4>
        <div className={PopupMenuStyles.Row}>
          <form onSubmit={handleSubmit}>
            <Input onChange={(e) => { setRoomId(e.target.value) }} style={{ width: 100, height: 25, margin: '15px 5px', display: 'inline-block' }}></Input>
            <Button style={{ margin: '15px 5px', height: 25, display: 'inline-block' }}>Join Room</Button>
          </form>
        </div>
        <h4 onClick={props.onClick} className={PopupMenuStyles.Cancel}>X</h4>
        {errMsg && <p className={PopupMenuStyles.Error}>{errMsg}</p>}
      </div>
    </div>
  );
}

export default PopupMenu;