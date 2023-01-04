const express = require('express')
const router = express.Router()
const roleMiddlewares = require('../middlewares/checkRole')
const authMiddlewares = require('../middlewares/checkAuthenticate')

module.exports = (io) => {
    const controller = require('../controllers/forumController')(io)
    router.get('/new', roleMiddlewares.checkAdminRole, controller.get_new)
    router.post('/new', roleMiddlewares.checkAdminRole, controller.post_new)
    router.get('/:slug/post-thread', authMiddlewares.checkNotAuthenticated, controller.get_post_thread)
    router.post('/:slug/post-thread', authMiddlewares.checkNotAuthenticated, controller.post_post_thread)
    router.get('/:slug/', controller.get_slug)
    router.get('/:slug/:page', controller.get_slug)
    return router
}