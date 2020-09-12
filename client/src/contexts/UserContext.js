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

  saveGridData = (time, difficulty, gridId) => {
    this.setState({
      time,
      difficulty,
      gridId
    })
  }

  removeGridData = (cb) => {
    this.setState({
      time: 0,
      difficulty: '',
      gridId: ''
    }, cb())
  }

  render() {
    return (
      <UserContext.Provider value={{
        ...this.state,
        userLogoff: this.userLogoff,
        userLogin: this.userLogin,
        saveGridData: this.saveGridData,
        removeGridData: this.removeGridData
      }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;