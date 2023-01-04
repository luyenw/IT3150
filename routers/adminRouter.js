const express = require('express')
const router = express.Router()
const checkRole = require('../middlewares/checkRole')

module.exports = (io) => {
    const controller = require('../controllers/adminController')(io)
    router.get('/', checkRole.checkAdminRole, controller.get_root)
    router.post('/new_box', checkRole.checkAdminRole, controller.post_new_box)
    return router
}