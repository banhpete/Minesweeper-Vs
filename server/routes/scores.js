const express = require('express');
const scoreCtrl = require('../controllers/scores')
const { authUser } = require('../controllers/user')
const { checkOrigin } = require('../middleware/requestMiddleware')

const router = express.Router();

// Submit score and return new top 10 scores based on some difficulty
router.post("/", checkOrigin, authUser, scoreCtrl.submitScore)

// Retreieve top 10 scores based on some difficulty
router.get("/", scoreCtrl.listScores)

module.exports = router;