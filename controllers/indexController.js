const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const Forum = require('../models/ForumModel')
const Box = require('../models/BoxModel')

exports.get_root = (req, res) => {
    Box.find({}).populate({path: 'forumsID', populate: {path: 'lastThread', populate: {path: 'userID'}}}).exec((err, boxes)=>{
        boxes = boxes.map(box=>box.toObject())
        res.render('pages/index', {user: req.user, boxes: boxes})
    })
}
exports.post_root = (req, res) => {
    req.logout((err)=>{
        if (err) { return next(err)}
        res.redirect('/');
    });
}
exports.get_register = (req, res) =>{
    res.render('pages/register', {user: req.user})
}
exports.get_login = (req, res) => {
    res.render('pages/login', {user: req.user})
}
exports.post_register = (req, res) => {
    User.findOne({username: req.body.username})
    .then(user=>{
        if(user){
            console.log('user exist ')
            res.redirect('/register')
        }else{
            try{
                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(req.body.password, salt, (err, hash)=>{
                        const user = {username: req.body.username, password: hash}
                        const new_user = new User(user)
                        new_user.save()
                    });
                });
                res.redirect('/login')
            }catch(err){
                res.redirect('/register')
            }
        }
    })
}
exports.post_login = (req, res) => {

}