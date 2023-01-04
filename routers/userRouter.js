const express = require('express')
const router = express.Router()

module.exports = (io) => {
    const controller = require('../controllers/userController')(io)
    router.get('/:slug', controller.get_username)
    return router
}