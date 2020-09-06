import React, { useEffect, useState } from 'react';
import HighscoresStyles from './Highscores.module.css'
import { listScores } from '../../utils/scoreService';
import Button from '../Button/Button';

const Highscores = () => {
  const [easyScores, setEasyScores] = useState([])
  const [normalScores, setNormalScores] = useState([])
  const [hardScores, setHardScores] = useState([])
  const [scoreVisible, setScoreVisible] = useState("Easy")

  useEffect(() => {
    const func = async (diff, cb) => {
      const data = await listScores(diff)
      cb(data)
    };

    func('Easy', (scores) => { setEasyScores(scores) });
    func('Normal', (scores) => { setNormalScores(scores) });
    func('Hard', (scores) => { setHardScores(scores) });
  }, [])

  const renderRows = (arr) => {
    return arr.map((score) => (
      <div key={score.id} className={HighscoresStyles.Row}>
        <div key={`${score.id}-${score.username}`} className={HighscoresStyles.Cell}><p className={HighscoresStyles.Text}>{score.username}</p></div>
        <div key={`${score.id}-${score.time}`} className={HighscoresStyles.Cell}><p className={HighscoresStyles.Text}>{score.time} s</p></div>
      </div>
    ))
  }

  return (
    <div className={HighscoresStyles.Container}>
      <div className={HighscoresStyles.Header}>
        <p className={HighscoresStyles.Title}>High Scores</p>
      </div>
      <div className={HighscoresStyles.Body}>
        <div className={HighscoresStyles.Row}>
          <Button activated={scoreVisible === "Easy"}
            onClick={() => setScoreVisible("Easy")}
            style={{ width: 75, padding: 4, margin: '2px auto' }}>
            Easy
          </Button>
          <Button activated={scoreVisible === "Normal"}
            onClick={() => setScoreVisible("Normal")}
            style={{ width: 75, padding: 4, margin: '2px auto' }}>
            Normal
          </Button>
          <Button activated={scoreVisible === "Hard"}
            onClick={() => setScoreVisible("Hard")}
            style={{ width: 75, padding: 4, margin: '2px auto' }}>
            Hard
          </Button>
        </div>
        <div className={HighscoresStyles.Row}>
          <div className={HighscoresStyles.Cell}><p className={HighscoresStyles.Title}>Username</p></div>
          <div className={HighscoresStyles.Cell}><p className={HighscoresStyles.Title}>Time</p></div>
        </div>
        {scoreVisible === "Easy" ? renderRows(easyScores) : scoreVisible === "Normal" ? renderRows(normalScores) : renderRows(hardScores)}
      </div>
    </div>
  );
}

export default Highscores;