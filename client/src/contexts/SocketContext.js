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
    gameReset: false,

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
      this.setState({
        gameStart: true
      })
    })

    // Receiving new grid
    socket.on('new-grid', (grid, diff) => {
      this.setState({
        tempGrid: grid,
        tempDiff: diff,
        playerTurn: 'player1'
      })
    })

    // Receiving cell click
    socket.on('cell-click', (i, j, playerContinue) => {
      let nextPlayerTurn = this.state.playerTurn;
      if (!playerContinue) {
        if (this.state.playerTurn === 'player1') {
          nextPlayerTurn = 'player2'
        } else {
          nextPlayerTurn = 'player1'
        }
      }
      this.setState({
        prevClick: [i, j],
        playerTurn: nextPlayerTurn
      })
    })

    // End game cause player disconnect or closes window
    socket.on('player-end-game', () => {
      this.setState({
        player: 'player1',
        gameStart: false,
        gameReset: true
      })
    })

  }

  /* ---- Socket Event Emitters ------------------------------------------------------------------------------------------------ */
  joinRoom = (roomId, player) => {
    socket.emit('join-room', roomId, (player) => {
      this.setState({
        roomId,
        player
      })
    })
  }

  checkRoom = (roomId, cb) => {
    socket.emit('check-room', roomId, cb)
  }

  leaveRoom = () => {
    socket.emit('leave-room', this.state.roomId, () => {
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

  cellClick = (i, j, playerContinue) => {
    socket.emit('cell-click', this.state.roomId, i, j, playerContinue);
    if (!playerContinue) {
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
  }

  removeClick = () => {
    this.setState({
      prevClick: null
    })
  }

  gameDCReset = () => {
    this.setState({
      gameReset: false //Set back to false after we have removed the grid. GameReset is technically misleading, by this point the game has resetted already.
    })
  }

  /* ---- Render Provider ------------------------------------------------------------------------------------------------ */
  render() {
    return (
      <SocketContext.Provider value={{
        ...this.state,
        joinRoom: this.joinRoom,
        checkRoom: this.checkRoom,
        leaveRoom: this.leaveRoom,
        newGrid: this.newGrid,
        removeGrid: this.removeGrid,
        cellClick: this.cellClick,
        removeClick: this.removeClick,
        gameDCReset: this.gameDCReset
      }}>
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}

export default SocketContextProvider;