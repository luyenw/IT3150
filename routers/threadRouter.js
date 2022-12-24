const express = require('express')
const router = express.Router()
const threadController = require('../controllers/threadController')
const middlewares = require('../middlewares/checkAuthenticate')

router.get('/:slug', threadController.get_slug)
router.get('/:slug/:page', threadController.get_slug)
router.post('/:slug/add_reply', middlewares.checkNotAuthenticated, threadController.post_add_reply)
module.exports = router