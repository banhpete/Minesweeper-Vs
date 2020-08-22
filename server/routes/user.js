const express = require('express')
const userCtrl = require('../controllers/user')

const router = express.Router()

router.post('/create', userCtrl.userCreate)

router.post('/signin', userCtrl.userLogin)

module.exports = router