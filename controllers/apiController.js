const Comment = require('../models/CommentModel')
const User = require('../models/UserModel')
const Notification = require('../models/NotificationModel')
controller = {};
module.exports = (io) => {
    controller.get_comment_id = (req, res) => {
        Comment.findOne({_id: req.params.id}).populate('userID', ['username', 'slug']).exec((err, comment)=>{
            if(err){
                res.send(err)
            }
            res.send(comment)
        })
    }
    controller.get_me = (req, res) => {
        res.send({'_id': req.user._id,'username': req.user.username})
    }
    controller.get_noti = (req, res) => {
        user_id = req.user._id
        Notification.find({toID: user_id}).sort({createdAt: -1}).populate('fromID', ['username', 'avatarUrl']).populate('threadID', ['title']).exec((err, noti_list)=>{
            list = []
            options = {
                minute: "2-digit",
                hour: "2-digit",
                weekday: "short",
                year: "numeric",
                month: "2-digit",
                day: "numeric"
            };
            noti_list.forEach(noti=>{
                if(noti.fromID.username != req.user.username){
                    list.push({
                        'avatarUrl': noti.fromID.avatarUrl,
                        'from': noti.fromID.username,
                        'in': noti.threadID.title,
                        'at': noti.createdAt.toLocaleDateString("en", options)
                    })
                }
                console.log(noti.createdAt)
                // list.reverse()
            })
            res.send(list)
        })
    }
    return controller;
};
