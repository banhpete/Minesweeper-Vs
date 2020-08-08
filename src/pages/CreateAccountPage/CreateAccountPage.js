import React from 'react';
import GameTitle from '../../components/GameTitle/GameTitle';
import CreateAccountPageStyles from '../LoginPage/LoginPage.module.css'
import TypingInput from '../../components/TypingInput/TypingInput';
import Button from "../../components/Button/Button"

const CreateAccountPage = () => {
  return (
    <div className={CreateAccountPageStyles.Page}>
      <GameTitle />
      <div className={CreateAccountPageStyles.window}>
        <h2 className={CreateAccountPageStyles.windowTitle}>Create Account</h2>
        <p className={CreateAccountPageStyles.windowSubTitle}>Username:</p>
        <TypingInput type="text" />
        <p className={CreateAccountPageStyles.windowSubTitle}>Password:</p>
        <TypingInput type="password" />
        <p className={CreateAccountPageStyles.windowSubTitle}>Confirm Password:</p>
        <TypingInput type="password" />
        <p className={CreateAccountPageStyles.windowSubTitle}>Email:</p>
        <TypingInput type="text" />
        <p className={CreateAccountPageStyles.windowSubTitle}>Confirm Email:</p>
        <TypingInput type="text" />
        <Button height={30} width={125} fontSize={16} margin={'40px auto 10px auto'}>Create</Button>
      </div>
    </div>
  );
}

export default CreateAccountPage;