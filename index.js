// import express
const express = require('express')
const app = express()
// import passport + session
const passport = require('passport')
const session = require('express-session')
// import passport strategy
const initializePassport = require('./config/passport/index')
initializePassport(passport)
// import another libs
const bodyParser = require('body-parser')
const connect = require('./config/db/index.js')
require('dotenv').config()
// routers
const indexRouter = require('./routers/indexRouter')
const forumRouter = require('./routers/forumRouter')
const threadRouter = require('./routers/threadRouter')
const userRouter = require('./routers/userRouter')
const adminRouter = require('./routers/adminRouter')
// connect db
connect()
// view engine
app.set('view engine', 'ejs')
// middlewares
app.use(express.static([__dirname, 'public'].join('/')))
app.use(bodyParser.urlencoded({
    limit: '200mb',
    extended: true,
}));
app.use(bodyParser.json({limit: '200mb'}))
// passport
app.use(express.json({limit: '200mb'}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'))
//
app.use('/', indexRouter)
app.use('/f', forumRouter)
app.use('/t', threadRouter)
app.use('/u', userRouter)
app.use('/admin', adminRouter)
//
app.listen(3000)
