const express = require("express");
const router = express.Router();
const passport = require("passport");
const middlewares = require("../middlewares/checkAuthenticate");

module.exports = (io) => {
    const controller = require("../controllers/indexController.js")(io);
    router.get("/", controller.get_root);
    router.post("/", controller.post_root);
    router.get(
        "/register",
        middlewares.checkAuthenticated,
        controller.get_register
    );
    router.post(
        "/register",
        middlewares.checkAuthenticated,
        controller.post_register
    );
    router.get("/login", middlewares.checkAuthenticated, controller.get_login);
    router.post("/login", middlewares.checkAuthenticated, passport.authenticate('local', { failureRedirect: '/login' }), controller.post_login);
    router.post("/upload", middlewares.checkNotAuthenticated, controller.post_upload)
    return router;
};
