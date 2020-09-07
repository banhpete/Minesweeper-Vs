const express = require('express')
const minesweeperCtrl = require('../controllers/minesweeper')

const router = express.Router()

router.post('/', minesweeperCtrl.gridGen)

router.post('/save', minesweeperCtrl.save)

module.exports = router