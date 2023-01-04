const User = require("../models/UserModel");
const constant = require("../config/constant");

controller = {};
module.exports = (io) => {
    controller.get_username = (req, res) => {
        User.findOne({ slug: req.params.slug }, (err, user) => {
            if (user) {
                if (user.avatarUrl == "default-avatar")
                    user.avatarUrl = constant.DEFAULT_USER_IMAGE;
                res.render("pages/user/index", { user: req.user, profile: user });
            }
        });
    };
    return controller;
};
