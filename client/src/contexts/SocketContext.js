import React, { Component, createContext } from 'react'
import io from "socket.io-client";

export const SocketContext = createContext()

let socket;

class SocketContextProvider extends Component {
  state = {
    totalConnections: 0,
    socketOn: false,

    roomId: '',
    gameStart: false,
    player: '',
    playerTurn: '',
    prevClick: null,

    tempGrid: [],
    tempDiff: ''

  }

  /* ---- Socket Event Handlers ------------------------------------------------------------------------------------------------ */
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

    // Receiving new grid
    socket.on('new-grid', (grid, diff) => {
      console.log(grid)
      this.setState({
        tempGrid: grid,
        tempDiff: diff,
        playerTurn: 'player1'
      })
    })

    // Receiving cell click
    socket.on('cell-click', (i, j) => {
      console.log('cell clicked:', i, j)
      let nextPlayerTurn = '';
      if (this.state.playerTurn === 'player1') {
        nextPlayerTurn = 'player2'
      } else {
        nextPlayerTurn = 'player1'
      }
      this.setState({
        prevClick: [i, j],
        playerTurn: nextPlayerTurn
      })
    })

    // End game cause player disconnect or closes window
    socket.on('player-end-game', () => {
      console.log('game ended');
      this.setState({
        player: 'player1',
        gameStart: false
      })
    })

  }

  /* ---- Socket Event Emitters ------------------------------------------------------------------------------------------------ */
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
    console.log('Trying to leave')
    socket.emit('leave-room', this.state.roomId, () => {
      console.log('acknowledged')
      this.setState({
        roomId: '',
        player: '',
        gameStart: false
      })
    })
  }

  newGrid = (grid, diff) => {
    socket.emit('new-grid', this.state.roomId, grid, diff)
    this.setState({
      playerTurn: 'player1'
    })
  }

  removeGrid = () => {
    this.setState({
      tempGrid: [],
      tempDiff: ''
    })
  }

  cellClick = (i, j) => {
    socket.emit('cell-click', this.state.roomId, i, j);
    let nextPlayerTurn = '';
    if (this.state.playerTurn === 'player1') {
      nextPlayerTurn = 'player2'
    } else {
      nextPlayerTurn = 'player1'
    }
    this.setState({
      playerTurn: nextPlayerTurn
    })
  }

  removeClick = () => {
    this.setState({
      prevClick: null
    })
  }

  /* ---- Render Provider ------------------------------------------------------------------------------------------------ */
  render() {
    return (
      <SocketContext.Provider value={{
        ...this.state,
        joinRoom: this.joinRoom,
        leaveRoom: this.leaveRoom,
        newGrid: this.newGrid,
        removeGrid: this.removeGrid,
        cellClick: this.cellClick,
        removeClick: this.removeClick
      }}>
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}

export default SocketContextProvider;