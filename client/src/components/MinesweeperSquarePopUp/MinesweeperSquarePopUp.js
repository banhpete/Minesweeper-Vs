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
        console.log(props.time, props.diff)
        submitScore(props.time, props.diff)
      } else {
        user.saveScore(props.time, props.diff)
      }
    }
  }, [])

  var popUpContent = null;
  if (props.playerWinStatus) {
    if (user.username) {
      popUpContent = <h3 key={'scoreSubmitted'} className={MinesweeperSquarePopUpStyles.PopupTxt}>You Won! Your score was submitted</h3>
    } else {
      popUpContent = [<h3 key={'login'} className={MinesweeperSquarePopUpStyles.PopupTxt}>You Won! Log in to have your score submitted!</h3>,
      <div key={'popupBtns'} className={MinesweeperSquarePopUpStyles.PopupButtons}>
        <Link key={1} to="/user/login?next=game/classic"><Button style={{ margin: '0 10px', padding: '3px 8px' }}>Log In</Button></Link>
        <Link key={2} to="/user/create?next=game/classic" ><Button style={{ margin: '0 10px', padding: '3px 8px' }}>Create Account</Button></Link>
      </div>
      ]
    }
  } else {
    popUpContent = <h3 className={MinesweeperSquarePopUpStyles.PopupTxt}>You Lost! Try Again!</h3>
  }

  return (
    <div className={MinesweeperSquarePopUpStyles.Popup}>
      {popUpContent}
    </div>
  );
}

export default MinesweeperSquarePopUp;