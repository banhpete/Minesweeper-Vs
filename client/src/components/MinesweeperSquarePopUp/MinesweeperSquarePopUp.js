import React, { useContext, useEffect } from 'react';
import MinesweeperSquarePopUpStyles from './MinesweeperSquarePopUp.module.css'
import { UserContext } from '../../contexts/UserContext'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'
import { submitScore } from '../../utils/scoreService'

const MinesweeperSquarePopUp = (props) => {
  const user = useContext(UserContext);

  useEffect(() => {
    if (props.playerWinStatus) {
      if (user.username) {
        submitScore(props.time, props.diff, props.gridId)
      } else {
        user.saveTime(props.time, props.diff, props.gridId)
      }
    }
  }, [])

  var popUpContent = null;

  // Single Player Display
  if (props.playerWinStatus) {
    if (user.username) {
      popUpContent = <h3 key={'scoreSubmitted'} className={MinesweeperSquarePopUpStyles.PopupTxt}>You Won! Your score was submitted</h3>
    } else {
      popUpContent = [<h3 key={'login'} className={MinesweeperSquarePopUpStyles.PopupTxt}>You Won! Log in to have your score submitted!</h3>,
      <div key={'popupBtns'} className={MinesweeperSquarePopUpStyles.PopupButtons}>
        <Link key={1} to={{ pathname: "/user/login", state: { from: "/game/classic" } }}><Button style={{ margin: '0 10px', padding: '3px 8px' }}>Log In</Button></Link>
        <Link key={2} to={{ pathname: "/user/login", state: { from: "/game/classic" } }}><Button style={{ margin: '0 10px', padding: '3px 8px' }}>Create Account</Button></Link>
      </div>
      ]
    }
  } else if (props.playerWinStatus === false) {
    popUpContent = <h3 className={MinesweeperSquarePopUpStyles.PopupTxt}>You Lost! Try Again!</h3>
  }

  // Minehunter Display
  if (props.gameScores) {
    let playerWon = props.gameScores['player1'] > props.gameScores['player2'] ? 'Player 1' : 'Player 2'
    popUpContent = popUpContent = <h3 className={MinesweeperSquarePopUpStyles.PopupTxt}>{playerWon} Won!</h3>
  }

  return (
    <div className={MinesweeperSquarePopUpStyles.Popup}>
      {popUpContent}
    </div>
  );
}

export default MinesweeperSquarePopUp;