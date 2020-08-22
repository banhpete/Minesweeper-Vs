import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import HomePageStyles from './HomePage.module.css'
import Button from "../../components/Button/Button"
import SpecialButton from '../../components/SpecialButton/SpecialButton';
import GameTitle from '../../components/GameTitle/GameTitle';
import { UserContext } from '../../contexts/UserContext';

const HomePage = () => {
  const [specialButtonsState, setSpecialButtonsState] = useState([false, false, false])
  const [loading, setLoading] = useState(false)
  const [userMsg, setUserMsg] = useState("Currently Playing as Anonymous Mine Sweeper")
  const { username, userLogoff } = useContext(UserContext)

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
    setTimeout(() => { userLogoff(); setUserMsg(`You have logged off ${username}`); return setLoading(false) }, 500)
  }

  return (
    <div onClick={(e) => { e.stopPropagation(); changeButtonState() }} className={HomePageStyles.HomePage}>
      <GameTitle />
      <div className={HomePageStyles.authContainer}>
        {username ?
          <>
            <p className={HomePageStyles.authTitle}>Currently Playing as {username}</p>
            <Button height={25} width={113} margin={"3px 3px 34px 3px"} fontSize={14} onClick={userLogoffFreeze} loading={loading}>Log Off</Button>
          </> :
          <>
            <p className={HomePageStyles.authTitle}>{userMsg}</p>
            <Link to="/user/login"><Button height={25} width={113} margin={3} fontSize={14}>Log In</Button></Link>
            <Link to="/user/create"><Button height={25} width={113} margin={3} fontSize={14}>Create Account</Button></Link>
          </>
        }
      </div>
      <div className={HomePageStyles.menuContainer}>
        <h4 className={HomePageStyles.menuTitle}>Pick a Game Mode</h4>
        <Button height={50} width={300} margin={10} fontSize={18} loading={loading}>Classic Minesweeper (1P)</Button>
        <SpecialButton
          height={50}
          width={300}
          margin={8}
          fontSize={18}
          secondaryHeight={80}
          menuToggle={specialButtonsState[0]}
          index={0}
          changeButtonState={changeButtonState}
          loading={loading}
          components={
            <>
              <Button height={35} width={175} margin='auto' fontsize={16}>Challenge Random Player</Button>
              <Button height={35} width={175} margin='auto' fontsize={16}>Challenge Friend</Button>
            </>
          }>
          Time Race Minesweeper (2P)
        </SpecialButton>
        <SpecialButton
          height={50}
          width={300}
          margin={8}
          fontSize={18}
          secondaryHeight={80}
          menuToggle={specialButtonsState[1]}
          index={1}
          changeButtonState={changeButtonState}
          loading={loading}
          components={
            <>
              <Button height={35} width={175} margin='auto' fontsize={16}>Challenge Random Player</Button>
              <Button height={35} width={175} margin='auto' fontsize={16}>Challenge Friend</Button>
            </>
          }>
          Minehunter (2P)
        </SpecialButton>
        <SpecialButton
          height={50}
          width={300}
          margin={8}
          fontSize={18}
          secondaryHeight={80}
          menuToggle={specialButtonsState[2]}
          index={2}
          changeButtonState={changeButtonState}
          loading={loading}
          components={
            <>
              <Button height={35} width={175} margin='auto' fontsize={16}>Challenge Random Player</Button>
              <Button height={35} width={175} margin='auto' fontsize={16}>Challenge Friend</Button>
            </>
          }>
          Minehunter Galore (2P)
        </SpecialButton>
      </div>
    </div>
  );
}

export default HomePage;