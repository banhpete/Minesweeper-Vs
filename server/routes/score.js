const express = require('express');
const scoreCtrl = require('../controllers/score')
const { authUser } = require('../controllers/user')

const router = express.Router();

// Score Submit
router.post("/", authUser, scoreCtrl.submitScore)

// Score Retrieve
router.get("/", function (req, res, next) {
  res.json({ "Message": "It Works!" })
})

module.exports = router;