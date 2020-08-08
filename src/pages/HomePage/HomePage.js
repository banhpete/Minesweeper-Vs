import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import HomePageStyles from './HomePage.module.css'
import Button from "../../components/Button/Button"
import SpecialButton from '../../components/SpecialButton/SpecialButton';
import GameTitle from '../../components/GameTitle/GameTitle';

const HomePage = () => {
  const [specialButtonsState, setSpecialButtonsState] = useState([false, false, false])

  const changeButtonState = (index = null) => {
    let newArr = [false, false, false]
    if (!isNaN(index)) {
      if (!specialButtonsState[index]) {
        newArr[index] = true;
      }
    }
    setSpecialButtonsState(newArr)
  }

  return (
    <div onClick={(e) => { e.stopPropagation(); changeButtonState() }} className={HomePageStyles.HomePage}>
      <GameTitle />
      <div className={HomePageStyles.authContainer}>
        <p className={HomePageStyles.authTitle}>Currently Playing as Anonymous Mine Sweeper 13</p>
        <Link to="/login"><Button height={25} width={113} margin={3} fontSize={14}>Log In</Button></Link>
        <Link to="/createaccount"><Button height={25} width={113} margin={3} fontSize={14}>Create Account</Button></Link>
      </div>
      <div className={HomePageStyles.menuContainer}>
        <h4 className={HomePageStyles.menuTitle}>Pick a Game Mode</h4>
        <Button height={50} width={300} margin={10} fontSize={18}>Classic Minesweeper (1P)</Button>
        <SpecialButton
          height={50}
          width={300}
          margin={8}
          fontSize={18}
          secondaryHeight={80}
          menuToggle={specialButtonsState[0]}
          index={0}
          changeButtonState={changeButtonState}
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