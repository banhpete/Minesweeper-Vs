import React, { createContext } from 'react';
import { userGet, userLogoff } from '../utils/userServices'

export const UserContext = createContext()

class UserContextProvider extends React.Component {
  state = { username: userGet() }

  userLogin = (token) => {
    this.setState({ username: userGet() })
  }

  userLogoff = () => {
    console.log('hi')
    userLogoff()
    this.setState({ username: "" })
  }

  render() {
    return (
      <UserContext.Provider value={{ ...this.state, userLogoff: this.userLogoff, userLogin: this.userLogin }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;