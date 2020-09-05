const psqlClient = require('../db')

async function submitScore(req, res, next) {
  try {
    const query = `INSERT INTO scores (difficulty, time, user_id) VALUES ($1, $2, $3)`;
    const query2 = "SELECT username, time, difficulty FROM scores INNER JOIN users ON scores.user_id = users.id WHERE difficulty=$1 ORDER BY time LIMIT 10";
    const values = [req.body.difficulty, req.body.time, req.userId];
    const values2 = [req.body.difficulty]
    await psqlClient.query(query, values)
    var updatedScoresData = await psqlClient.query(query2, values2)
  } catch (err) {
    const error = new Error("Database issue when submitting score")
    return next(error)
  }
  return res.json({ "newScores": updatedScoresData.rows })
}

async function listScores(req, res, next) {
  try {
    const query = "SELECT username, time, difficulty FROM scores INNER JOIN users ON scores.user_id = users.id WHERE difficulty=$1 ORDER BY time LIMIT 10";
    const values = [req.query.difficulty];
    var scoresData = await psqlClient.query(query, values)
  } catch (err) {
    const error = new Error("Database issue when retrieving scores")
    return next(error)
  }
  return res.json(scoresData.rows)
}

module.exports = { submitScore, listScores } 