import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import GameTitle from '../../components/GameTitle/GameTitle';
import CreateAccountPageStyles from '../LoginPage/LoginPage.module.css'
import TypingInput from '../../components/TypingInput/TypingInput'
import Button from "../../components/Button/Button"

class CreateAccountPage extends Component {
  state = {
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
    emailConfirm: "",
    errMsg: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const errMsg = this.state.errMsg ?
      <p className={`${CreateAccountPageStyles.windowSubTitle} ${CreateAccountPageStyles.error} `}>{this.state.errMsg}</p> :
      <p style={{ visibility: 'hidden' }} className={`${CreateAccountPageStyles.windowSubTitle} ${CreateAccountPageStyles.error} `}>No Error</p>

    return (
      <div className={CreateAccountPageStyles.Page}>
        <GameTitle />
        <div className={CreateAccountPageStyles.window}>
          <h2 className={CreateAccountPageStyles.windowTitle}>Create Account</h2>
          <p className={CreateAccountPageStyles.windowSubTitle}>Username:</p>
          <TypingInput handleChange={this.handleChange} name="username" value={this.state.username} type="text" />
          <p className={CreateAccountPageStyles.windowSubTitle}>Password:</p>
          <TypingInput handleChange={this.handleChange} name="password" value={this.state.password} type="password" />
          <p className={CreateAccountPageStyles.windowSubTitle}>Confirm Password:</p>
          <TypingInput handleChange={this.handleChange} name="passwordConfirm" value={this.state.passwordConfirm} type="password" />
          <p className={CreateAccountPageStyles.windowSubTitle}>Email:</p>
          <TypingInput handleChange={this.handleChange} name="email" value={this.state.email} type="text" />
          <p className={CreateAccountPageStyles.windowSubTitle}>Confirm Email:</p>
          <TypingInput handleChange={this.handleChange} name="emailConfirm" value={this.state.emailConfirm} type="text" />
          {errMsg}
          <Button height={30} width={125} fontSize={16} margin={'15px auto 10px auto'}>Create</Button>
          <div className={CreateAccountPageStyles.cancel}>
            <Link to='/'>Cancel Log In</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateAccountPage;


// const CreateAccountPage = () => {
//   return (
//     <div className={CreateAccountPageStyles.Page}>
//       <GameTitle />
//       <div className={CreateAccountPageStyles.window}>
//         <h2 className={CreateAccountPageStyles.windowTitle}>Create Account</h2>
//         <p className={CreateAccountPageStyles.windowSubTitle}>Username:</p>
//         <TypingInput handleChange={this.handleChange} name="" type="text" />
//         <p className={CreateAccountPageStyles.windowSubTitle}>Password:</p>
//         <TypingInput handleChange={this.handleChange} name="" type="password" />
//         <p className={CreateAccountPageStyles.windowSubTitle}>Confirm Password:</p>
//         <TypingInput handleChange={this.handleChange} name="" type="password" />
//         <p className={CreateAccountPageStyles.windowSubTitle}>Email:</p>
//         <TypingInput handleChange={this.handleChange} name="" type="text" />
//         <p className={CreateAccountPageStyles.windowSubTitle}>Confirm Email:</p>
//         <TypingInput handleChange={this.handleChange} name="" type="text" />
//         <Button height={30} width={125} fontSize={16} margin={'40px auto 10px auto'}>Create</Button>
//       </div>
//     </div>
//   );
// }

// export default CreateAccountPage;