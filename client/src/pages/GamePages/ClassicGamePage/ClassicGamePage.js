import React, { Component } from 'react';
import MinesweeperSquare from '../../../components/MinesweeperSquare/MinesweeperSquare';
import ClassicGamePageStyles from './ClassicGamePage.module.css'
import gameMasterGen from "../../../utils/minesweeperFunctions"
import Select from '../../../components/Select/Select';
import GameTitle from '../../../components/GameTitle/GameTitle';
import MinesweeperSquareHeader from '../../../components/MinesweeperSquareHeader/MinesweeperSquareHeader';
import Highscores from '../../../components/Highscores/Highscores';

class ClassicGamePage extends Component {
  state = {
    forceGridUpdate: false, // As a result of hidden state we need to use a state and pass down to children to force updates
    timeStatus: "stop"
  }

  /* ---- Hidden State ------------------------------------------------------------------------------------------------ */
  gameMaster = gameMasterGen()

  /* ---- Event Methods ------------------------------------------------------------------------------------------------ */
  handleDiffChange = (e) => {
    this.gameMaster.gridGen(e.target.value, () => {
      this.setState({
        timeStatus: 'reset',
        forceGridUpdate: !this.state.forceGridUpdate
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
        forceGridUpdate: !this.state.forceGridUpdate
      })
    })
  }

  render() {
    return (
      <div className={ClassicGamePageStyles.ClassicGamePage}>
        <GameTitle title="Minesweeper Classic Mode" />
        <Select
          initial={"Select a Difficulty"}
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
          : <Highscores></Highscores>}

        {this.gameMaster.provideGameEnd() ?
          <div className={ClassicGamePageStyles.Popup}>
            <h3 className={ClassicGamePageStyles.PopupTxt}>{this.gameMaster.providePlayerWinStatus() ? "You Won!" : "You Lost"}</h3>
          </div>
          : null
        }

      </div>
    );
  }
}

export default ClassicGamePage;