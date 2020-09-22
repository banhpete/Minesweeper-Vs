import React, { Component } from 'react';
import ClassicGamePageStyles from './ClassicGamePage.module.css'
import Select from '../../../components/Select/Select';
import MinesweeperSquare from '../../../components/MinesweeperSquare/MinesweeperSquare';
import GameTitle from '../../../components/GameTitle/GameTitle';
import MinesweeperSquareHeader from '../../../components/MinesweeperSquareHeader/MinesweeperSquareHeader';
import Highscores from '../../../components/Highscores/Highscores';
import MinesweeperSquarePopUp from '../../../components/MinesweeperSquarePopUp/MinesweeperSquarePopUp';
import Button from '../../../components/Button/Button'
import { UserContext } from '../../../contexts/UserContext'
import { submitScore } from '../../../utils/scoreService'
import gameMasterGen from "../../../utils/minesweeperFunctions"

class ClassicGamePage extends Component {
  state = {
    forceGridUpdate: false, // As a result of hidden state we need to use a state and pass down to children to force updates
    timeStatus: "stop",
    msg: "",
    displayScores: true,
    lastClick: [0, 0]
  }

  static contextType = UserContext

  /* ---- Submit Score if redirected from login/create ---------------------------------------------------------------- */
  componentDidMount = () => {
    if (this.props.location.state) {
      this.props.history.replace(this.props.location.pathname, undefined)
      submitScore(this.context.time, this.context.difficulty, this.context.gridId)
      this.context.removeGridData(() => {
        this.setState({
          msg: "Your score was submitted"
        })
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
        displayScores: false
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
          lastClick: [i, j],
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

  handleDisplayScores = () => {
    this.setState({
      displayScores: !this.state.displayScores
    })
  }

  render() {
    return (
      <div className={ClassicGamePageStyles.ClassicGamePage}>
        <GameTitle title="Minesweeper Classic Mode" />
        <div className={ClassicGamePageStyles.Row}>
          <Select
            initial={"Select a Difficulty to Start"}
            options={['Easy', 'Normal', 'Hard']}
            style={{ display: "block", margin: 15 }}
            handleChange={this.handleDiffChange}
          />
          <Button
            style={{ height: 25, margin: 15 }}
            disabled={!this.gameMaster.provideGameEnd()}
            onClick={this.handleDisplayScores}>
            High Scores
        </Button>
        </div>

        {this.gameMaster.provideDiff() && !this.state.displayScores ?
          <>
            <div className={ClassicGamePageStyles.SquareContainer}>
              <MinesweeperSquareHeader
                timeStatus={this.state.timeStatus}
                time={this.gameMaster.provideTime()}
                handleReset={this.handleReset}
                mines={this.gameMaster.provideNumOfMines()}
              />
              <MinesweeperSquare
                lastClick={this.state.lastClick}
                forceGridUpdate={this.state.forceGridUpdate}
                handleSquareClick={this.handleSquareClick}
                handleSquareRightClick={this.handleSquareRightClick}
                diff={this.gameMaster.provideDiff()}
                gameGrid={this.gameMaster.provideGameGrid()}
              />
            </div>
            {this.gameMaster.provideGameEnd() &&
              <MinesweeperSquarePopUp
                playerWinStatus={this.gameMaster.providePlayerWinStatus()}
                time={this.gameMaster.provideTime()}
                diff={this.gameMaster.provideDiff()}
                gridId={this.gameMaster.provideGridId()}
              />}
          </>
          : <Highscores note={this.state.msg}></Highscores>}
      </div>
    );
  }
}

export default ClassicGamePage;