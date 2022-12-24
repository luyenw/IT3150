const User = require('../models/UserModel')
const constant = require('../config/constant')
exports.get_username = (req, res) =>{
    User.findOne({slug: req.params.slug}, (err, user)=>{
        if(user){
            if(user.avatarUrl == 'default-avatar')
                user.avatarUrl = constant.DEFAULT_USER_IMAGE
            res.render('pages/user/index', {user: user})
        }
    })
}