import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import HomePageStyles from './HomePage.module.css'
import Button from "../../components/Button/Button"
import GameTitle from '../../components/GameTitle/GameTitle';
import { UserContext } from '../../contexts/UserContext';
import { SocketContext } from '../../contexts/SocketContext';
import PopupMenu from '../../components/PopupMenu/PopupMenu';

const HomePage = (props) => {
  const [specialButtonsState, setSpecialButtonsState] = useState([false, false, false])
  const [loading, setLoading] = useState(false)
  const [userMsg, setUserMsg] = useState("Currently Playing as Anonymous Mine Sweeper")
  const [popupMenuState, togglePopupMenu] = useState(false)
  const [gameMode, setGameMode] = useState('')
  const { username, userLogoff } = useContext(UserContext)
  const { totalConnections } = useContext(SocketContext)

  const changeButtonState = (index = null) => {
    let newArr = [false, false, false]
    if (!isNaN(index)) {
      if (!specialButtonsState[index]) {
        newArr[index] = true;
      }
    }
    setSpecialButtonsState(newArr)
  }

  const userLogoffFreeze = () => {
    setLoading(true)
    setTimeout(() => { userLogoff(); setUserMsg(`You have logged off ${username}`); return setLoading(false) }, 150)
  }

  const userOnlineMsg = () => {
    if ((totalConnections - 1) <= 0) {
      return "There are no other Mine Sweepers Online"
    } else if ((totalConnections - 1) === 1) {
      return "There is 1 other Mine Sweeper Online"
    } else {
      return `There are ${totalConnections - 1} other Mine Sweepers Online`
    }
  }

  return (
    <div onClick={(e) => { e.stopPropagation(); changeButtonState() }} className={HomePageStyles.HomePage}>

      <GameTitle title="Minesweeper Vs." subtitle="Online Minesweeper Multiplayer" />
      <div className={HomePageStyles.authContainer}>
        {username ?
          <>
            <p className={HomePageStyles.authTitle}>Currently Playing as {username}</p>
            <p className={HomePageStyles.authTitle}>{userOnlineMsg()}</p>
            <Button style={{ height: 25, width: 113, margin: '3px 3px 34px 3px', fontSize: 14 }} onClick={userLogoffFreeze} loading={loading}>Log Off</Button>
          </> :
          <>
            <p className={HomePageStyles.authTitle}>{userMsg}</p>
            <p className={HomePageStyles.authTitle}>{userOnlineMsg()}</p>
            <Link to="/user/login"><Button style={{ height: 25, width: 113, margin: 3, fontSize: 14 }}>Log In</Button></Link>
            <Link to="/user/create"><Button style={{ height: 25, width: 113, margin: 3, fontSize: 14 }}>Create Account</Button></Link>
          </>
        }
      </div>
      <div className={HomePageStyles.menuContainer}>
        <h4 className={HomePageStyles.menuTitle}>Pick a Game Mode</h4>
        <Link to="/game/classic"><Button style={{ height: 50, width: 300, margin: 10, fontSize: 18 }} loading={loading}>Classic Minesweeper (1P)</Button></Link>
        <Button
          onClick={() => { setGameMode('Minehunter'); togglePopupMenu(!popupMenuState) }}
          style={{ height: 50, width: 300, margin: 10, fontSize: 18 }}
          loading={loading}>Minehunter (2P)
        </Button>
      </div>
      {popupMenuState &&
        <PopupMenu onClick={() => togglePopupMenu(!popupMenuState)} gameMode={gameMode} history={props.history} />}
    </div>
  );
}

export default HomePage;