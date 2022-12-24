const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)
const Schema = mongoose.Schema

const commentSchema = new Schema({
    threadID: {type: Schema.Types.ObjectId, ref: 'Forum'},
    userID: {type: Schema.Types.ObjectId, ref: 'User'},
    body: {type: String, require: true}, 
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date,  default: Date.now()}
})

commentSchema.pre('save', (next)=>{
    this.updatedAt =  Date.now()
    next()
})
module.exports = mongoose.model('Comment', commentSchema)