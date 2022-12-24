const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/:slug', userController.get_username)

module.exports = router