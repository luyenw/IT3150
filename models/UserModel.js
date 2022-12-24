const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)
const Schema = mongoose.Schema

const userSchema = new Schema({
    role:{type: Number, default: 1}, 
    username: {type: String, require: true},
    slug: {type: String, slug: "username", unique: true}, 
    avatarUrl: {type: String, default: 'default-avatar'},
    // email: {type: String, require: true},
    password: {type: String, require: true},
    joined: {type: String, default: (new Date()).toLocaleDateString()}
})

userSchema.pre('save', function(next){
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User