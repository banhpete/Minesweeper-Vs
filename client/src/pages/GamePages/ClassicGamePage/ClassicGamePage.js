import React, { Component } from 'react';
import MinesweeperSquare from '../../../components/MinesweeperSquare/MinesweeperSquare';
import ClassicGamePageStyles from './ClassicGamePage.module.css'
import gameMasterGen from "../../../utils/minesweeperFunctions"
import Select from '../../../components/Select/Select';
import Button from '../../../components/Button/Button'

// Check if there is a winner! And add win logic!
// So far we have the game working but we have no win logic or reseting or score saving

class ClassicGamePage extends Component {
  state = {
    time: 0,
    diff: '',
    forceChildUpdate: false
  }

  // Hidden state of the game grid using JavaScript Closure
  gameMaster = gameMasterGen()

  /* ---- Event Methods ------------------------------------------------------------------------------------------------ */
  handleDifficultychange = (e) => {
    this.gameMaster.gridGen(e.target.value, (diff) => {
      this.setState({ diff }, () => { if (this.interval) { this.timeReset() } })
    })
  }

  /* ---- Time Methods ------------------------------------------------------------------------------------------------ */
  interval = null

  timeStart = () => {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.setState({ time: this.state.time + 1 })
      }, 1000);
    }
  }

  timeStop = () => {
    clearInterval(this.interval);
    this.interval = null
  }

  timeReset = () => {
    this.timeStop()
    this.setState({ time: 0 })
  }

  componentWillUnmount = () => {
    clearInterval(this.interval)
  }

  /* ---- Game Methods ------------------------------------------------------------------------------------------------ */

  gameEnd = () => {
    this.timeStop();
    if (this.gameMaster.providePlayerWinStatus()) {
      console.log("You Win")
    } else {
      console.log("You Lose")
    }
    this.forceUpdate();
  }

  gameReset = () => {
    this.timeReset();
    this.setState({
      forceChildUpdate: !this.state.forceChildUpdate
    })
  }

  render() {
    return (
      <div className={ClassicGamePageStyles.ClassicGamePage}>

        <div className={ClassicGamePageStyles.Header}>
          <h2 className={ClassicGamePageStyles.HeaderTitle} >Minesweeper Classic Mode</h2>
          <Select
            initial={"Select a Difficulty"}
            options={['Easy', 'Normal', 'Hard']}
            style={{ width: 200, margin: "15px 20px" }}
            handleChange={this.handleDifficultychange}
          />
        </div>

        {this.state.diff ?
          <div className={ClassicGamePageStyles.SquareContainer}>
            <div className={ClassicGamePageStyles.SquareHeader}>
              <p>Mines: {this.gameMaster.provideNumOfMines()}</p>
              <Button
                onClick={() => { this.gameMaster.gridReset(this.state.diff, this.gameReset) }}>
                {this.gameMaster.provideGameEnd() ? "Press here to reset" : "Reset"}
              </Button>
              <p> Time: {this.state.time}s</p>
            </div>
            <MinesweeperSquare
              timeStart={this.timeStart}
              gameEnd={this.gameEnd}
              diff={this.state.diff}
              gameMaster={this.gameMaster}
              forceChildUpdate={this.state.forceChildUpdate}
            />
          </div>
          : null
        }

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