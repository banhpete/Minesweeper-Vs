import React, { Component, createContext } from 'react'
import io from "socket.io-client";

export const SocketContext = createContext()

let socket;

class SocketContextProvider extends Component {
  state = {
    totalConnections: 0,
    roomId: '',
    gameStart: false,
    player: '',
    socketOn: false
  }

  componentDidMount = () => {
    socket = io()

    // To update connection numbers
    socket.on('totalConnections', (data) => {
      this.setState({
        socketOn: true,
        totalConnections: data.totalConnections
      })
    })

    // Starting game
    socket.on('start-game', () => {
      console.log('game started')
      this.setState({
        gameStart: true
      })
    })

  }

  joinRoom = (roomId, player) => {
    console.log('Trying to set')
    socket.emit('join-room', roomId, (player) => {
      console.log('acknowledged')
      this.setState({
        roomId,
        player
      })
    })
  }

  leaveRoom = () => {
    console.log('Trying to set')
    socket.emit('leave-room', this.state.roomId, () => {
      console.log('acknowledged')
      this.setState({
        roomId: '',
        player: '',
        gameStart: false
      })
    })
  }

  render() {
    return (
      <SocketContext.Provider value={{
        ...this.state,
        joinRoom: this.joinRoom,
        leaveRoom: this.leaveRoom,
      }}>
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}

export default SocketContextProvider;