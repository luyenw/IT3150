const Comment = require('../models/CommentModel')
const User = require('../models/UserModel')
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
    return controller;
};
