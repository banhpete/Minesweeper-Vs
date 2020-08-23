const express = require('express')
const minesweeperCtrl = require('../controllers/minesweeper')

const router = express.Router()

router.post('/', minesweeperCtrl.gridGen)

module.exports = router