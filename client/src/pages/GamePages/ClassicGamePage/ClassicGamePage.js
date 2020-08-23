import React, { Component } from 'react';
import MinesweeperSquare from '../../../components/MinesweeperSquare/MinesweeperSquare';
import ClassicGamePageStyles from './ClassicGamePage.module.css'
import gameMasterGen from "../../../utils/minesweeperFunctions"
import Select from '../../../components/Select/Select';

// Check if there is a winner! And add win logic!
// So far we have the game working but we have no win logic or reseting or score saving

class ClassicGamePage extends Component {
  state = {
    time: 0,
    diff: '',
  }

  // Hidden state of the game grid using JavaScript Closure
  gameMaster = gameMasterGen()

  handleDifficultychange = (e) => {
    this.gameMaster.gridGen(e.target.value, (diff) => {
      this.setState({ diff }, () => { if (this.interval) { this.timeReset() } })
    })
  }

  // Time Methods
  interval = null

  timeStart = () => {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.setState({ time: this.state.time + 1 })
      }, 1000);
    }
  }

  timeReset = () => {
    clearInterval(this.interval);
    this.interval = null
    this.setState({ time: 0 })
  }

  componentWillUnmount = () => {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div className={ClassicGamePageStyles.ClassicGamePage}>
        {this.state.diff ?
          <>
            <div className={ClassicGamePageStyles.Header}>
              <p>Mines</p>
              <p>Time: {this.state.time}s</p>
            </div>
            <MinesweeperSquare
              timeStart={this.timeStart}
              diff={this.state.diff}
              gameMaster={this.gameMaster}
            />
          </>
          : null
        }
        <Select
          initial={"Select a Difficulty"}
          options={['Easy', 'Normal', 'Hard']}
          style={{ position: 'absolute', top: 0, left: 0, margin: "15px 20px" }}
          handleChange={this.handleDifficultychange}
        />
      </div>
    );
  }
}

export default ClassicGamePage;