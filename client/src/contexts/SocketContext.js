import React, { Component, createContext } from 'react'
import io from "socket.io-client";

export const SocketContext = createContext()

let socket;

class SocketContextProvider extends Component {
  state = { totalConnections: 0 }

  componentDidMount = () => {
    socket = io('http://localhost:3000')
    socket.on('totalConnections', (data) => { this.setState({ totalConnections: data.totalConnections }) })
  }

  render() {
    return (
      <SocketContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}

export default SocketContextProvider;