import React, { Component } from 'react';
import MinesweeperSquare from '../../../components/MinesweeperSquare/MinesweeperSquare';
import ClassicGamePageStyles from './ClassicGamePage.module.css'
import gameMasterGen from "../../../utils/minesweeperFunctions"
import Select from '../../../components/Select/Select';
import GameTitle from '../../../components/GameTitle/GameTitle';
import MinesweeperSquareHeader from '../../../components/MinesweeperSquareHeader/MinesweeperSquareHeader';
import Highscores from '../../../components/Highscores/Highscores';
import MinesweeperSquarePopUp from '../../../components/MinesweeperSquarePopUp/MinesweeperSquarePopUp';
import { UserContext } from '../../../contexts/UserContext'
import { submitScore } from '../../../utils/scoreService'

class ClassicGamePage extends Component {
  state = {
    forceGridUpdate: false, // As a result of hidden state we need to use a state and pass down to children to force updates
    timeStatus: "stop",
    msg: ""
  }

  static contextType = UserContext

  /* ---- Submit Score if redirected from login/create ---------------------------------------------------------------- */
  componentDidMount = () => {
    if (this.props.location.state) {
      this.props.history.replace(this.props.location.pathname, undefined)
      submitScore(this.context.time, this.context.difficulty)
      this.setState({
        msg: "Your score was submitted"
      })
    }
  }

  /* ---- Hidden State ------------------------------------------------------------------------------------------------ */
  gameMaster = gameMasterGen()

  /* ---- Event Methods ------------------------------------------------------------------------------------------------ */
  handleDiffChange = (e) => {
    this.gameMaster.gridGen(e.target.value, () => {
      this.setState({
        timeStatus: 'reset',
        forceGridUpdate: !this.state.forceGridUpdate,
      })
    })
  }

  handleSquareClick = (i, j) => {
    if (!this.gameMaster.provideGameEnd()) {
      this.setState({
        timeStatus: 'start'
      })
    }
    this.gameMaster.cellClick(i, j, () => {
      if (this.gameMaster.provideGameEnd()) {
        this.setState({
          timeStatus: 'stop',
          forceGridUpdate: !this.state.forceGridUpdate
        })
      } else {
        this.setState({
          forceGridUpdate: !this.state.forceGridUpdate
        })
      }
    });
  }

  handleSquareRightClick = (i, j) => {
    this.gameMaster.cellRightClick(i, j, () => {
      this.setState({
        forceGridUpdate: !this.state.forceGridUpdate
      })
    })
  }

  handleReset = () => {
    this.gameMaster.gridGen(false, () => {
      this.setState({
        timeStatus: "reset",
        forceGridUpdate: !this.state.forceGridUpdate,
      })
    })
  }

  render() {
    return (
      <div className={ClassicGamePageStyles.ClassicGamePage}>
        <GameTitle title="Minesweeper Classic Mode" />
        <Select
          initial={"Select a Difficulty to Start"}
          options={['Easy', 'Normal', 'Hard']}
          style={{ display: "block", margin: "15px auto" }}
          handleChange={this.handleDiffChange}
        />

        {this.gameMaster.provideDiff() ?
          <div className={ClassicGamePageStyles.SquareContainer}>
            <MinesweeperSquareHeader
              timeStatus={this.state.timeStatus}
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
          : <Highscores note={this.state.msg}></Highscores>}

        {this.gameMaster.provideGameEnd() ?
          <MinesweeperSquarePopUp
            playerWinStatus={this.gameMaster.providePlayerWinStatus()}
            time={this.gameMaster.provideTime()}
            diff={this.gameMaster.provideDiff()}
          /> :
          null}
      </div>
    );
  }
}

export default ClassicGamePage;