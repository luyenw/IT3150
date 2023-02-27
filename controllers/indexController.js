const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const Forum = require("../models/ForumModel");
const Box = require("../models/BoxModel");
const Notification = require("../models/NotificationModel");
const { populate } = require("../models/NotificationModel");
controller = {};
module.exports = (io) => {
    controller.get_root = (req, res) => {
        all_box = null
        Box.find({})
            .populate({
                path: "forumsID",
                populate: { path: "lastThread", populate: { path: "userID" } },
            })
            .exec((err, boxes) => {
                boxes = boxes.map((box) => box.toObject());
                if(req.user){
                    Notification.find({toID: req.user._id})
                    .populate({
                        path: "fromID",
                    })
                    .populate({
                        path: "threadID"
                    })
                    .exec((err, notifications)=>{
                        all_noti = []
                        options = {
                            minute: "2-digit",
                            hour: "2-digit",
                            weekday: "short",
                            year: "numeric",
                            month: "2-digit",
                            day: "numeric"
                        };
                        // all_noti = all_noti.map((noti)=>noti.toObject())
                        res.render("pages/index", { user: req.user, boxes: boxes});
                    })
                }else{
                    res.render("pages/index", { user: req.user, boxes: boxes});
                }   
            });
    };
    controller.post_root = (req, res) => {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/");
        });
    };
    controller.get_register = (req, res) => {
        res.render("pages/register", { user: req.user });
    };
    controller.get_login = (req, res) => {
        res.render("pages/login", { user: req.user });
    };
    controller.post_register = (req, res) => {
        User.findOne({ username: req.body.username }).then((user) => {
            if (user) {
                console.log("user exist ");
                res.redirect("/register");
            } else {
                try {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            const user = {
                                username: req.body.username,
                                password: hash,
                            };
                            const new_user = new User(user);
                            new_user.save();
                        });
                    });
                    res.redirect("/login");
                } catch (err) {
                    res.redirect("/register");
                }
            }
        });
    };
    controller.post_login = (req, res) => {
        res.set('userId', req.user._id)
        res.redirect('/')
    };
    controller.post_upload = (req, res) => {
        const image = req.files.image;
        console.log(image)
        if (!image) return res.sendStatus(400);
        const { dirname } = require('path');
        const appDir = dirname(require.main.filename);
        image.name = req.user.username + '.png'
        image.mv(appDir+'/public/upload/'+image.name, (err)=>{
            if(err) res.status(500).send(err)
            else{
                User.findOne({_id: req.user._id}, (e, user)=>{
                    user.avatarUrl = ('/upload/'+image.name).replace('\\', '/')
                    user.save()
                });
                res.redirect('/u/'+req.user.username)
            }
        });
    }
    return controller;
};
