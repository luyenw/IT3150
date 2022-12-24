const express = require('express')
const router = express.Router()
const roleMiddlewares = require('../middlewares/checkRole')
const authMiddlewares = require('../middlewares/checkAuthenticate')
const forumController = require('../controllers/forumController')

router.get('/new', roleMiddlewares.checkAdminRole, forumController.get_new)
router.post('/new', roleMiddlewares.checkAdminRole, forumController.post_new)
router.get('/:slug/post-thread', authMiddlewares.checkNotAuthenticated, forumController.get_post_thread)
router.post('/:slug/post-thread', authMiddlewares.checkNotAuthenticated, forumController.post_post_thread)
router.get('/:slug/', forumController.get_slug)
router.get('/:slug/:page', forumController.get_slug)
module.exports = router