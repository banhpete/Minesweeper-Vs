import React, { Component } from 'react';
import MinehunterPageStyles from './MinehunterPage.module.css'
import Select from '../../../components/Select/Select';
import MinesweeperSquare from '../../../components/MinesweeperSquare/MinesweeperSquare';
import GameTitle from '../../../components/GameTitle/GameTitle';
import MinesweeperSquareHeader from '../../../components/MinesweeperSquareHeader/MinesweeperSquareHeader';
import MinesweeperSquarePopUp from '../../../components/MinesweeperSquarePopUp/MinesweeperSquarePopUp';
import Button from '../../../components/Button/Button'
import { SocketContext } from '../../../contexts/SocketContext'
import { submitScore } from '../../../utils/scoreService'
import gameMasterGen from "../../../utils/minehunterFunctions"

class MinehunterPage extends Component {
  state = {
    forceGridUpdate: false, // As a result of hidden state we need to use a state and pass down to children to force updates
    msg: "",
    displayScores: true
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
    console.log('unmount')
    if (this.context.socketOn) {
      console.log('leave room')
      this.context.leaveRoom()
    }
  }

  // Handle context update
  componentDidUpdate = () => {
    if (this.context.tempGrid.length !== 0) {
      console.log("I Shouldn't be here")
      this.gameMaster.giveGrid(this.context.tempGrid, this.context.tempDiff);
      this.context.removeGrid();
    }

    console.log('componentDidUpdate:', this.context.prevClick);

    if (this.context.prevClick) {
      console.log('removing preClick:');
      this.gameMaster.cellClick(this.context.prevClick[0], this.context.prevClick[1], this.context.playerTurn, () => {
        this.context.removeClick()
        this.setState({
          //Time stop
          forceGridUpdate: !this.state.forceGridUpdate
        })
      });
    }

    if (this.context.gameReset) {
      this.gameMaster = gameMasterGen();
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
        this.context.cellClick(i, j, playerContinue)
        if (this.gameMaster.provideGameEnd()) {
          this.setState({
            //Time stop
            forceGridUpdate: !this.state.forceGridUpdate
          })
        } else {
          this.setState({
            forceGridUpdate: !this.state.forceGridUpdate
          })
        }
      });
    }
  }

  // handleSquareRightClick = (i, j) => {
  //   this.gameMaster.cellRightClick(i, j, () => {
  //     this.setState({
  //       forceGridUpdate: !this.state.forceGridUpdate
  //     })
  //   })
  // }

  handleReset = () => {
    this.gameMaster.gridGen(false, (grid, diff) => {
      this.context.newGrid(grid, diff)
      this.setState({
        forceGridUpdate: !this.state.forceGridUpdate,
        displayScores: false
      })
    })
  }

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
            {this.context.playerTurn && <p> - {`${this.context.playerTurn}'s Turn`}</p>}
          </>
        )
      } else {
        let diff = this.gameMaster.provideDiff();
        console.log('diff:', diff)
        if (!diff) {
          return (<p>Waiting for player 1 to select Game Difficulty</p>)
        } else {
          return (<p>{`${diff} Mode - ${this.context.playerTurn}'s Turn`}</p>)
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
              handleReset={this.handleReset}
              gameScores={this.gameMaster.provideScore()}
            />
            <MinesweeperSquare
              forceGridUpdate={this.state.forceGridUpdate}
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