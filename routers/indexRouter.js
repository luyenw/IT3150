const express = require('express')
const router = express.Router()
const indexControllers = require('../controllers/indexController.js')
const passport = require('passport')
const middlewares = require('../middlewares/checkAuthenticate')

router.get('/', indexControllers.get_root)
router.post('/', indexControllers.post_root)
router.get('/register', middlewares.checkAuthenticated, indexControllers.get_register)
router.post('/register', middlewares.checkAuthenticated, indexControllers.post_register)
router.get('/login', middlewares.checkAuthenticated, indexControllers.get_login)
router.post('/login', middlewares.checkAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}))

module.exports = router