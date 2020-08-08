import React from 'react';
import LoginPageStyles from './LoginPage.module.css'
import GameTitle from '../../components/GameTitle/GameTitle';
import TypingInput from '../../components/TypingInput/TypingInput';
import Button from "../../components/Button/Button"

const LoginPage = () => {
  return (
    <div className={LoginPageStyles.Page}>
      <GameTitle />
      <form className={LoginPageStyles.window}>
        <h3 className={LoginPageStyles.windowTitle}> Log in to Minesweeper Vs.</h3>
        <p className={LoginPageStyles.windowSubTitle}>Username:</p>
        <TypingInput type="text" />
        <p className={LoginPageStyles.windowText}>Forgot Username</p>
        <p className={LoginPageStyles.windowSubTitle}>Password:</p>
        <TypingInput type="password" />
        <p className={LoginPageStyles.windowText}>Forgot Password</p>
        <Button height={30} width={125} fontSize={16} margin={'40px auto 10px auto'}>Log In</Button>
      </form>
    </div>
  );
}

export default LoginPage;