import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserLoginPageStyles from '../UserForm.module.css'
import GameTitle from '../../../components/GameTitle/GameTitle';
import TypingInput from '../../../components/TypingInput/TypingInput';
import Button from "../../../components/Button/Button"
import { userLogin } from '../../../utils/userServices'
import { UserContext } from '../../../contexts/UserContext';

class UserLoginPage extends Component {
  state = {
    username: "",
    password: "",
    errMsg: "",
    loading: false
  }

  static contextType = UserContext;

  query = null;
  componentDidMount() {
    this.query = new URLSearchParams(this.props.location.search)
    console.log(this.query.get('next'))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errMsg: ""
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    if (!(this.state.username && this.state.password)) {
      this.setState({ errMsg: 'Please enter an username and password' })
      return
    }

    this.setState({
      loading: true
    })

    const responseData = await userLogin(this.state)

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
      this.props.history.push('/')
    }

    return
  }

  render() {
    const errMsg = (
      <p className={`${UserLoginPageStyles.windowSubTitle} ${UserLoginPageStyles.error}`} style={this.state.errMsg ? {} : { visibility: 'hidden' }}>
        {this.state.errMsg ? this.state.errMsg : "Error"}
      </p>)

    return (
      <div className={UserLoginPageStyles.Page}>
        <GameTitle />
        <form className={UserLoginPageStyles.window} onSubmit={this.handleSubmit}>
          <h3 className={UserLoginPageStyles.windowTitle}> Log in to Minesweeper Vs.</h3>
          <p className={UserLoginPageStyles.windowSubTitle}>Username:</p>
          <TypingInput handleChange={this.handleChange} name="username" type="text" value={this.state.username} />
          <p className={UserLoginPageStyles.windowText}>Forgot Username</p>
          <p className={UserLoginPageStyles.windowSubTitle}>Password:</p>
          <TypingInput handleChange={this.handleChange} name="password" type="password" value={this.state.password} />
          <p className={UserLoginPageStyles.windowText}>Forgot Password</p>
          {errMsg}
          <Button style={{ height: 30, width: 125, fontSize: 16, margin: '15px auto 10px auto' }} loading={this.state.loading}>Log In</Button>
          <div className={UserLoginPageStyles.cancel}>
            <Link to='/'>Cancel Log In</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default UserLoginPage;

