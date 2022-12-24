const LocalStrategy = require('passport-local').Strategy
const User = require('../../models/UserModel')
const bcrypt = require('bcrypt')

const authUser = async (username, password, done) => {
    User.findOne({username: username}).then(user=>{
        if(user == null) return done(null, false, {message: 'no user with that username'})
        try{
            bcrypt.compare(password, user.password, (err, res)=>{
                if(err){
                    console.log(err)
                }
                if(res){
                    return done(null, user)
                }else{
                    console.log('false')
                    return done(null, false)
                }
            })
        }catch(err){
            return done(err)
        }
    })
}
const initialize = (passport) =>{
    passport.use(new LocalStrategy({usernameField: 'username', passwordField: 'password'}, authUser))
    passport.serializeUser((user, done)=>{ done(null, user._id)})
    passport.deserializeUser((id, done)=>{
        User.findOne({_id: id}).then(user=>{
            if(user) return done(null, user)
        })
    })
}
module.exports = initialize