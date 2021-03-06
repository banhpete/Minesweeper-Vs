import React, { Component } from 'react';
import MinehunterPageStyles from './MinehunterPage.module.css'
import Select from '../../../components/Select/Select';
import MinesweeperSquare from '../../../components/MinesweeperSquare/MinesweeperSquare';
import GameTitle from '../../../components/GameTitle/GameTitle';
import MinesweeperSquareHeader from '../../../components/MinesweeperSquareHeader/MinesweeperSquareHeader';
import MinesweeperSquarePopUp from '../../../components/MinesweeperSquarePopUp/MinesweeperSquarePopUp';
import { SocketContext } from '../../../contexts/SocketContext'
import gameMasterGen from "../../../utils/minehunterFunctions"

class MinehunterPage extends Component {
  state = {
    forceGridUpdate: false, // As a result of hidden state we need to use a state and pass down to children to force updates
    msg: "",
    displayScores: true,
    lastClick: [0, 0],
    flags: {}
  }

  /* ---- Hidden State ------------------------------------------------------------------------------------------------ */
  gameMaster = gameMasterGen()

  /* ---- Bring in Context ------------------------------------------------------------------------------------------------ */
  static contextType = SocketContext

  /* ---- Lifecycle ---------------------------------------------------------------------------------------------------- */

  // Redirect if there is no room, or if the room longer than 4 characters or if for whatever reason the socket 
  // is not yet established (Generally after page refresh). Otherwise join the room!
  componentDidMount = () => {
    if (!this.props.location.search || this.props.location.search.length > 12 || !this.context.socketOn) {
      this.props.history.push('/')
    } else {
      this.context.joinRoom(this.props.location.search.substr(-4, 4))
    }
  }

  // Handle components leaving the room
  componentWillUnmount = () => {
    if (this.context.socketOn) {
      this.context.leaveRoom()
    }
  }

  // Handle context update
  componentDidUpdate = () => {
    if (this.context.tempGrid.length !== 0) {
      this.gameMaster.giveGrid(this.context.tempGrid, this.context.tempDiff);
      this.context.removeGrid(() => {
        this.setState({
          flags: {}
        })
      });
    }

    if (this.context.prevClick) {
      this.gameMaster.cellClick(this.context.prevClick[0], this.context.prevClick[1], this.context.playerTurn, () => {
        let prevClick = [this.context.prevClick[0], this.context.prevClick[1]]
        let newflags = { ...this.state.flags };
        if (this.state.flags[`${this.context.prevClick[0]}-${this.context.prevClick[1]}`]) {
          delete newflags[`${this.context.prevClick[0]}-${this.context.prevClick[1]}`]
        }
        this.context.removeClick()
        this.setState({
          lastClick: prevClick,
          forceGridUpdate: !this.state.forceGridUpdate,
          flags: newflags
        })
      });
    }

    if (this.context.gameDC) {
      this.gameMaster = gameMasterGen();
      this.setState({
        flags: {}
      })
      this.context.gameDCReset()
    }
  }

  /* ---- Event Methods ------------------------------------------------------------------------------------------------ */

  // Difficulty selected and grid is generated. Anytime a new grid emit to socket server to have player 2 receive grid.
  handleDiffChange = (e) => {
    this.gameMaster.gridGen(e.target.value, (grid, diff) => {
      this.context.newGrid(grid, diff)
      this.setState({
        forceGridUpdate: !this.state.forceGridUpdate,
        displayScores: false
      })
    })
  }

  handleSquareClick = (i, j) => {
    if (this.context.playerTurn === this.context.player) {
      this.gameMaster.cellClick(i, j, this.context.player, (playerContinue) => {
        this.context.cellClick(i, j, playerContinue);
        if (this.state.flags[`${i}-${j}`]) {
          let newflags = { ...this.state.flags };
          delete newflags[`${i}-${j}`]
          this.setState({
            flags: newflags
          })
        }
        if (this.gameMaster.provideGameEnd()) {
          this.setState({
            //Time stop
            lastClick: [i, j],
            forceGridUpdate: !this.state.forceGridUpdate
          })
        } else {
          this.setState({
            lastClick: [i, j],
            forceGridUpdate: !this.state.forceGridUpdate
          })
        }
      });
    }
  }

  handleSquareRightClick = (i, j) => {
    if (!this.state.flags[`${i}-${j}`]) {
      this.setState({
        flags: { ...this.state.flags, [`${i}-${j}`]: true }
      })
    } else {
      let newflags = { ...this.state.flags };
      delete newflags[`${i}-${j}`]
      this.setState({
        flags: newflags
      })
    }
  }

  throttleTracker = false;
  handleCellEnter = (i, j) => {
    if (!this.throttleTracker) {
      this.context.cellEnter(i, j);
      this.throttletracker = true;
      setInterval(() => { this.throttleTracker = false }, 300)
    }
  }

  handleReset = () => {
    this.gameMaster.gridGen(false, (grid, diff) => {
      this.context.newGrid(grid, diff)
      this.setState({
        forceGridUpdate: !this.state.forceGridUpdate,
        displayScores: false,
        flags: {}
      })
    })
  }

  /* ---- Render Method ------------------------------------------------------------------------------------------------ */
  loadRow = () => {
    if (this.context.gameStart) {
      if (this.context.player === "player1") {
        return (
          <>
            <Select
              initial={"Select a Difficulty to Start"}
              options={['Easy', 'Normal', 'Hard']}
              style={{ display: "block", margin: '15px 5px' }}
              handleChange={this.handleDiffChange}
            />
            {this.context.playerTurn ?
              this.context.playerTurn === this.context.player ?
                <p style={{ fontWeight: 700, color: '#0000ff' }}> - Your Turn </p> :
                <p > - Player 2's Turn</p> :
              null
            }
          </>
        )
      } else {
        let diff = this.gameMaster.provideDiff();
        if (!diff) {
          return (<p>Waiting for player 1 to select Game Difficulty</p>)
        } else {
          let style = {
            fontWeight: this.context.playerTurn === 'player2' ? 700 : 400,
            color: this.context.playerTurn === 'player2' ? '#008000' : '#000000'
          }
          return (<p style={style}>{`${diff} Mode - ` +
            ((this.context.playerTurn === this.context.player) ?
              'Your Turn' : "Player 1's Turn")
          }</p>)
        }
      }
    } else {
      if (this.context.player === "player1") {
        return (<p>Waiting for player 2 to join room {this.context.roomId}</p>)
      } else {
        return (<p>Loading Room</p>)
      }

    }
  }

  render() {
    return (
      <div className={MinehunterPageStyles.MinehunterPage}>
        <GameTitle title="Mine Hunter Mode" />

        <div className={MinehunterPageStyles.Row}>
          {this.loadRow()}
        </div>

        {(this.context.gameStart && (this.gameMaster.provideGameGrid().length !== 0)) &&
          <div className={MinehunterPageStyles.SquareContainer}>
            <MinesweeperSquareHeader
              player={this.context.player}
              handleReset={this.handleReset}
              gameScores={this.gameMaster.provideScore()}
            />
            <MinesweeperSquare
              flags={this.state.flags}
              player={this.context.player}
              otherPlayerPosition={this.context.otherPlayerPosition}
              lastClick={this.state.lastClick}
              forceGridUpdate={this.state.forceGridUpdate}
              handleCellEnter={this.handleCellEnter}
              handleSquareClick={this.handleSquareClick}
              handleSquareRightClick={this.handleSquareRightClick}
              diff={this.gameMaster.provideDiff()}
              gameGrid={this.gameMaster.provideGameGrid()}
            />
          </div>
        }

        {(this.gameMaster.provideGameEnd() && this.context.gameStart) &&
          <MinesweeperSquarePopUp
            gameScores={this.gameMaster.provideScore()}
          />
        }
      </div>
    );
  }
}

export default MinehunterPage;