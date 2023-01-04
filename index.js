// import express
const express = require("express");
const app = express();
const http = require("http").Server(app);
// import passport + session
const passport = require("passport");
const session = require("express-session");
// import passport strategy
const initializePassport = require("./config/passport/index");
initializePassport(passport);
// import socket io
http.listen(3000);
const io = require("socket.io")(http);

const connections = {};

// import another libs
const bodyParser = require("body-parser");
const connect = require("./config/db/index.js");
require("dotenv").config();
const cors = require('cors')
const cookies = require('cookie-parser');
const { nextTick } = require("process");
// connect db
connect();
// view engine
app.set("view engine", "ejs");
// middlewares
const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use(cookies());
app.use(cors())
app.use(express.static([__dirname, "public"].join("/")));
app.use(
    bodyParser.urlencoded({
        limit: "200mb",
        extended: true,
    })
);
app.use(bodyParser.json({ limit: "200mb" }));
// passport
app.use(express.json({ limit: "200mb" }));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
// routers
const indexRouter = require("./routers/indexRouter")(io);
const forumRouter = require("./routers/forumRouter")(io);
const threadRouter = require("./routers/threadRouter")(io);
const userRouter = require("./routers/userRouter")(io);
const adminRouter = require("./routers/adminRouter")(io);
//
app.use("/", indexRouter);
app.use("/f", forumRouter);
app.use("/t", threadRouter);
app.use("/u", userRouter);
app.use("/admin", adminRouter);
//
