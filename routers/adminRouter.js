const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const checkRole = require('../middlewares/checkRole')

router.get('/', checkRole.checkAdminRole, adminController.get_root)
router.post('/new_box', checkRole.checkAdminRole, adminController.post_new_box)

module.exports = router