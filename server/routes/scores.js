const express = require('express');
const scoreCtrl = require('../controllers/scores')
const { authUser } = require('../controllers/user')

const router = express.Router();

// Score Submit
router.post("/", authUser, scoreCtrl.submitScore)

// Score Retrieve
router.get("/", scoreCtrl.listScores)

module.exports = router;