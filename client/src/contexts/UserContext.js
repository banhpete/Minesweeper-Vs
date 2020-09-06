import React, { createContext } from 'react';
import { userGet, userLogoff } from '../utils/userServices'

export const UserContext = createContext()

class UserContextProvider extends React.Component {
  state = { username: userGet(), score: 0, difficulty: '' }

  userLogin = (token) => {
    this.setState({ username: userGet() })
  }

  userLogoff = () => {
    userLogoff()
    this.setState({ username: "" })
  }

  saveScore = (score, difficulty) => {
    this.setState({
      score,
      difficulty
    })
  }

  render() {
    return (
      <UserContext.Provider value={{ ...this.state, userLogoff: this.userLogoff, userLogin: this.userLogin, saveScore: this.saveScore }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;