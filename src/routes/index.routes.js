const express = require('express')
const router = express.Router()
const { ping } = require('../controllers/index.controller.js')

router.get('/ping', ping)

module.exports = router
