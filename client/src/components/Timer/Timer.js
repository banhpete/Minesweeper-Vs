import React, { Component } from 'react';

class Timer extends Component {
  state = {
    time: 0
  }

  interval = null;

  /* ---- Logic for starting/stopping/reseting timer ------------------------------------------------------------------------------------------------ */
  componentDidUpdate(prevProps, prevState) {
    if (this.props.timeStatus === "start" && this.interval === null) {
      if (this.props.timeStatus !== 0) { this.setState({ time: 0 }) }
      this.interval = setInterval(() => {
        this.setState({
          time: this.state.time + 1
        })
      }, 1000);
    } else if (this.props.timeStatus !== "start") {
      if (this.props.timeStatus === "reset" && this.state.time > 0) {
        this.setState({
          time: 0
        })
      }
      clearInterval(this.interval)
      this.interval = null;
    }
  }

  /* ---- Clean up ------------------------------------------------------------------------------------------------ */
  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }

  render() {
    return (
      <p>Time: {this.state.time}s</p>
    );
  }
}

export default Timer;