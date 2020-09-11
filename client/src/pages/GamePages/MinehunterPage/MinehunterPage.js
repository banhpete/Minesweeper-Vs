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
    gridSetYet: false,
    timeStatus: "stop",
    msg: "",
    displayScores: true
  }

  static contextType = SocketContext

  /* ---- Hidden State ------------------------------------------------------------------------------------------------ */
  gameMaster = gameMasterGen()

  /* ---- Lifecycle ---------------------------------------------------------------------------------------------------- */
  componentDidMount = () => {
    if (!this.props.location.search || !this.context.socketOn || this.props.location.search.length > 12) {
      this.props.history.push('/')
    } else {
      this.context.joinRoom(this.props.location.search.substr(-4, 4))
    }
  }

  componentWillMount = () => {
    if (this.context.socketOn) {
      this.context.leaveRoom()
    }
  }

  /* ---- Event Methods ------------------------------------------------------------------------------------------------ */
  handleDiffChange = (e) => {
    this.gameMaster.gridGen(e.target.value, (grid) => {

      this.setState({
        timeStatus: 'reset',
        forceGridUpdate: !this.state.forceGridUpdate,
        displayScores: false
      })
    })
  }

  // handleSquareClick = (i, j) => {
  //   this.gameMaster.cellClick(i, j, (grid) => {
  //     if (!this.state.gridSetYet) {
  //       this.setState({
  //         gridSetYet: true
  //       })
  //       this.context.setGrid(grid)
  //     }
  //     this.context.sendMessage();
  //     if (this.gameMaster.provideGameEnd()) {
  //       this.setState({
  //         timeStatus: 'stop',
  //         forceGridUpdate: !this.state.forceGridUpdate
  //       })
  //     } else {
  //       this.setState({
  //         forceGridUpdate: !this.state.forceGridUpdate
  //       })
  //     }
  //   });
  // }

  // handleSquareRightClick = (i, j) => {
  //   this.gameMaster.cellRightClick(i, j, () => {
  //     this.setState({
  //       forceGridUpdate: !this.state.forceGridUpdate
  //     })
  //   })
  // }

  // handleReset = () => {
  //   this.gameMaster.gridGen(false, () => {
  //     this.setState({
  //       timeStatus: "reset",
  //       forceGridUpdate: !this.state.forceGridUpdate,
  //     })
  //   })
  // }

  // handleDisplayScores = () => {
  //   console.log('hello! You clicked me')
  //   this.setState({
  //     displayScores: !this.state.displayScores
  //   })
  // }

  loadRow1 = () => {
    if (this.context.gameStart) {
      if (this.context.player === "player1") {
        return (
          <Select
            initial={"Select a Difficulty to Start"}
            options={['Easy', 'Normal', 'Hard']}
            style={{ display: "block", margin: '15px auto' }}
            handleChange={this.handleDiffChange}
          />
        )
      } else {
        if (this.gameMaster.provideGameGrid.length === 0) {
          return (<p>Waiting for player 1 to select Game Difficulty</p>)
        } else {
          return (<p>Difficulty has been selected</p>)
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
          {this.loadRow1()}
        </div>



        {/* {(this.gameMaster.provideDiff() && !this.state.displayScores) &&
          <>
            <div className={MinehunterPageStyles.SquareContainer}>
              <MinesweeperSquareHeader
                timeStatus={this.state.timeStatus}
                time={this.gameMaster.provideTime()}
                handleReset={this.handleReset}
                mines={this.gameMaster.provideNumOfMines()}
              />
              <MinesweeperSquare
                forceGridUpdate={this.state.forceGridUpdate}
                handleSquareClick={this.handleSquareClick}
                handleSquareRightClick={this.handleSquareRightClick}
                diff={this.gameMaster.provideDiff()}
                gameGrid={this.gameMaster.provideGameGrid()}
              />
            </div>
            <p>{this.context.roomId}</p>
            {this.gameMaster.provideGameEnd() &&
              <MinesweeperSquarePopUp
                playerWinStatus={this.gameMaster.providePlayerWinStatus()}
                time={this.gameMaster.provideTime()}
                diff={this.gameMaster.provideDiff()}
                gridId={this.gameMaster.provideGridId()}
              />}
          </>} */}
      </div>
    );
  }
}

export default MinehunterPage;