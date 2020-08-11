import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginPageStyles from './LoginPage.module.css'
import GameTitle from '../../components/GameTitle/GameTitle';
import TypingInput from '../../components/TypingInput/TypingInput';
import Button from "../../components/Button/Button"

class LoginPage extends Component {
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
      <p className={`${LoginPageStyles.windowSubTitle} ${LoginPageStyles.error} `}>Error</p> :
      <p style={{ visibility: 'hidden' }} className={`${LoginPageStyles.windowSubTitle} ${LoginPageStyles.error} `}>Error</p>

    return (
      <div className={LoginPageStyles.Page}>
        <GameTitle />
        <form className={LoginPageStyles.window}>
          <h3 className={LoginPageStyles.windowTitle}> Log in to Minesweeper Vs.</h3>
          <p className={LoginPageStyles.windowSubTitle}>Username:</p>
          <TypingInput handleChange={this.handleChange} name="username" type="text" value={this.state.username} />
          <p className={LoginPageStyles.windowText}>Forgot Username</p>
          <p className={LoginPageStyles.windowSubTitle}>Password:</p>
          <TypingInput handleChange={this.handleChange} name="password" type="password" value={this.state.password} />
          <p className={LoginPageStyles.windowText}>Forgot Password</p>
          {errMsg}
          <Button height={30} width={125} fontSize={16} margin={'15px auto 10px auto'}>Log In</Button>
          <div className={LoginPageStyles.cancel}>
            <Link to='/'>Cancel Log In</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;

// const LoginPage = () => {
//   return (
//     <div className={LoginPageStyles.Page}>
//       <GameTitle />
//       <form className={LoginPageStyles.window}>
//         <h3 className={LoginPageStyles.windowTitle}> Log in to Minesweeper Vs.</h3>
//         <p className={LoginPageStyles.windowSubTitle}>Username:</p>
//         <TypingInput name="username" type="text" />
//         <p className={LoginPageStyles.windowText}>Forgot Username</p>
//         <p className={LoginPageStyles.windowSubTitle}>Password:</p>
//         <TypingInput name="password" type="password" />
//         <p className={LoginPageStyles.windowText}>Forgot Password</p>
//         <Button height={30} width={125} fontSize={16} margin={'40px auto 10px auto'}>Log In</Button>
//       </form>
//     </div>
//   );
// }

// export default LoginPage;