import React, { createContext } from 'react';
import { userGet, userLogoff } from '../utils/userServices'

export const UserContext = createContext()

class UserContextProvider extends React.Component {
  state = { username: userGet(), time: 0, difficulty: '', gridId: '' }

  userLogin = (token) => {
    this.setState({ username: userGet() })
  }

  userLogoff = () => {
    userLogoff()
    this.setState({ username: "" })
  }

  saveTime = (time, difficulty, gridId) => {
    this.setState({
      time,
      difficulty,
      gridId
    })
  }

  render() {
    return (
      <UserContext.Provider value={{ ...this.state, userLogoff: this.userLogoff, userLogin: this.userLogin, saveTime: this.saveTime }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;