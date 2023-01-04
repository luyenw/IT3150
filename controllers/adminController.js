const Box = require("../models/BoxModel");

controller = {};
module.exports = (io) => {
    controller.get_root = (req, res) => {
        res.render("pages/admin/index");
    };
    controller.post_new_box = (req, res) => {
        const box = new Box({ title: req.body.title });
        box.save();
        res.redirect("/");
    };
    return controller;
};
