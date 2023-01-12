const express = require('express')
const router = express.Router()
const middlewares = require('../middlewares/checkAuthenticate')
module.exports = (io) =>{
    const controller = require('../controllers/apiController')(io)
    router.get('/comment/:id', controller.get_comment_id)
    router.get('/me', middlewares.checkNotAuthenticated, controller.get_me)
    return router
}