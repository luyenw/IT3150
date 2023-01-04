const express = require('express')
const router = express.Router()
const middlewares = require('../middlewares/checkAuthenticate')

module.exports = (io) => {
    const controller = require('../controllers/threadController')(io)
    router.get('/:slug/', controller.get_slug)
    router.get('/:slug/:page', controller.get_slug)
    router.post('/:slug/add_reply', middlewares.checkNotAuthenticated, controller.post_add_reply)
    return router
}