import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserLoginPageStyles from '../UserForm.module.css'
import GameTitle from '../../../components/GameTitle/GameTitle';
import TypingInput from '../../../components/TypingInput/TypingInput';
import Button from "../../../components/Button/Button"

class UserLoginPage extends Component {
  state = {
    username: "",
    password: "",
    errMsg: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const errMsg = this.state.errMsg ?
      <p className={`${UserLoginPageStyles.windowSubTitle} ${UserLoginPageStyles.error} `}>Error</p> :
      <p style={{ visibility: 'hidden' }} className={`${UserLoginPageStyles.windowSubTitle} ${UserLoginPageStyles.error} `}>Error</p>

    return (
      <div className={UserLoginPageStyles.Page}>
        <GameTitle />
        <form className={UserLoginPageStyles.window}>
          <h3 className={UserLoginPageStyles.windowTitle}> Log in to Minesweeper Vs.</h3>
          <p className={UserLoginPageStyles.windowSubTitle}>Username:</p>
          <TypingInput handleChange={this.handleChange} name="username" type="text" value={this.state.username} />
          <p className={UserLoginPageStyles.windowText}>Forgot Username</p>
          <p className={UserLoginPageStyles.windowSubTitle}>Password:</p>
          <TypingInput handleChange={this.handleChange} name="password" type="password" value={this.state.password} />
          <p className={UserLoginPageStyles.windowText}>Forgot Password</p>
          {errMsg}
          <Button height={30} width={125} fontSize={16} margin={'15px auto 10px auto'}>Log In</Button>
          <div className={UserLoginPageStyles.cancel}>
            <Link to='/'>Cancel Log In</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default UserLoginPage;

