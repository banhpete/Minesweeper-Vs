import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import GameTitle from '../../../components/GameTitle/GameTitle';
import UserCreatePageStyles from '../UserForm.module.css'
import TypingInput from '../../../components/TypingInput/TypingInput'
import Button from "../../../components/Button/Button"
import { userCreate } from '../../../utils/userServices'
import { UserContext } from '../../../contexts/UserContext';

class UserCreatePage extends Component {
  state = {
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
    emailConfirm: "",
    errMsg: "",
    loading: false
  }

  static contextType = UserContext

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    // Check Entries
    if (!(this.state.username && this.state.password && this.state.email)) {
      this.setState({
        errMsg: "Please ensure all entires are filled out"
      })
      return
    }

    // Validating Inputs
    const regExChar = /[A-Za-z0-9_-]$/
    const regExLength = /.{5,20}$/
    const regExEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!regExChar.test(this.state.username)) {
      this.setState({
        errMsg: "Username cannot have any punctuation or symbols"
      })
      return
    }
    if (!regExLength.test(this.state.username)) {
      this.setState({
        errMsg: "Username shall be between 5-20 characters"
      })
      return
    }
    if (!regExEmail.test(this.state.email)) {
      this.setState({
        errMsg: "Email provided is not a valid email"
      })
      return
    }
    if (!regExLength.test(this.state.password)) {
      this.setState({
        errMsg: "Password shall be between 5-20 characters"
      })
      return
    }

    // Confirming Passwords and Emails
    if (this.state.password !== this.state.passwordConfirm) {
      this.setState({
        errMsg: "Please ensure your passwords are matching"
      })
      return
    } else if (this.state.email !== this.state.emailConfirm) {
      this.setState({
        errMsg: "Please ensure your emails are matching"
      })
      return
    }

    this.setState({
      errMsg: "",
      loading: true
    })

    const responseData = await userCreate(this.state)

    if (responseData.error) {
      this.setState({
        errMsg: responseData.error,
        loading: false
      })
    } else {
      this.setState({
        loading: false
      })

      this.context.userLogin()
      let routerState = this.props.location.state
      if (routerState) {
        this.props.history.push(routerState.from, { from: 'login' })
      } else {
        this.props.history.push('/')
      }
    }

    return
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
          <Button style={{ height: 30, width: 125, fontSize: 16, margin: '15px auto 10px auto' }} loading={this.state.loading}>Create</Button>
          <div className={UserCreatePageStyles.cancel}>
            <Link to='/'>Cancel Log In</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default UserCreatePage;
