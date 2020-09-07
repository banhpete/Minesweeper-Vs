const psql = require('../db')
const { checkSquare } = require('../data/minesweeperData')

async function submitScore(req, res, next) {
  if (!(req.body.difficulty === "Easy" || req.body.difficulty === "Normal" || req.body.difficulty === "Hard")) {
    return res.json({ "message": "Score not submitted" })
  } else if (isNaN(req.body.time) || isNaN(req.userId)) {
    return res.json({ "message": "Score not submitted" })
  }


  if (checkSquare(req.session.id, req.body.gridId)) {
    try {
      const query = `INSERT INTO scores (difficulty, time, user_id) VALUES ($1, $2, $3)`;
      const query2 = "SELECT scores.id, username, time, difficulty FROM scores INNER JOIN users ON scores.user_id = users.id WHERE difficulty=$1 ORDER BY time LIMIT 10";
      const values = [req.body.difficulty, req.body.time, req.userId];
      const values2 = [req.body.difficulty]
      await psql.query(query, values)
      var updatedScoresData = await psql.query(query2, values2)
    } catch (err) {
      const error = new Error("Database issue when submitting score")
      return next(error)
    }
    return res.json({ "newScores": updatedScoresData.rows })
  } else {
    return res.json({ "message": "Score not submitted" })
  }
}

async function listScores(req, res, next) {
  if (!(req.query.difficulty === "Easy" || req.query.difficulty === "Normal" || req.query.difficulty === "Hard")) {
    return res.json({ "message": "Query not allowed" })
  }

  try {
    const query = "SELECT scores.id, username, time, difficulty FROM scores INNER JOIN users ON scores.user_id = users.id WHERE difficulty=$1 ORDER BY time LIMIT 10";
    const values = [req.query.difficulty];
    var scoresData = await psql.query(query, values)
  } catch (err) {
    const error = new Error("Database issue when retrieving scores")
    return next(error)
  }
  return res.json(scoresData.rows)
}

module.exports = { submitScore, listScores } 