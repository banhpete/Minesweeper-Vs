import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import GameTitle from '../../../components/GameTitle/GameTitle';
import UserCreatePageStyles from '../UserForm.module.css'
import TypingInput from '../../../components/TypingInput/TypingInput'
import Button from "../../../components/Button/Button"

class UserCreatePage extends Component {
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

  handleSubmit = (e) => {
    e.preventDefault()
    console.log()

    if (this.state.password !== this.state.passwordConfirm) {
      this.setState({
        errMsg: "Please ensure your passwords are matching"
      })
    } else if (this.state.email !== this.state.emailConfirm) {
      this.setState({
        errMsg: "Please ensure your emails are matching"
      })
    }
  }

  render() {
    const errMsg = this.state.errMsg ?
      <p className={`${UserCreatePageStyles.windowSubTitle} ${UserCreatePageStyles.error} `}>{this.state.errMsg}</p> :
      <p style={{ visibility: 'hidden' }} className={`${UserCreatePageStyles.windowSubTitle} ${UserCreatePageStyles.error} `}>No Error</p>

    return (
      <div className={UserCreatePageStyles.Page}>
        <GameTitle />
        <form onSubmit={this.handleSubmit} className={UserCreatePageStyles.window}>
          <h2 className={UserCreatePageStyles.windowTitle}>Create Account</h2>
          <p className={UserCreatePageStyles.windowSubTitle}>Username:</p>
          <TypingInput handleChange={this.handleChange} name="username" value={this.state.username} type="text" />
          <p className={UserCreatePageStyles.windowSubTitle}>Password:</p>
          <TypingInput handleChange={this.handleChange} name="password" value={this.state.password} type="password" />
          <p className={UserCreatePageStyles.windowSubTitle}>Confirm Password:</p>
          <TypingInput handleChange={this.handleChange} name="passwordConfirm" value={this.state.passwordConfirm} type="password" />
          <p className={UserCreatePageStyles.windowSubTitle}>Email:</p>
          <TypingInput handleChange={this.handleChange} name="email" value={this.state.email} type="text" />
          <p className={UserCreatePageStyles.windowSubTitle}>Confirm Email:</p>
          <TypingInput handleChange={this.handleChange} name="emailConfirm" value={this.state.emailConfirm} type="text" />
          {errMsg}
          <Button height={30} width={125} fontSize={16} margin={'15px auto 10px auto'}>Create</Button>
          <div className={UserCreatePageStyles.cancel}>
            <Link to='/'>Cancel Log In</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default UserCreatePage;
