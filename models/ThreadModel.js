const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)
const Comment = require('../models/CommentModel')
const Schema = mongoose.Schema

const threadSchema = new Schema({
    title: {type: String, require: true},
    body: {type: String, require: true},
    slug: {type: String, slug: "title", unique: true},
    commentsID: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    forumID: {type: Schema.Types.ObjectId, ref: 'Forum'},
    // author
    userID: {type: Schema.Types.ObjectId, ref: 'User'},
    lastComment: {type: Schema.Types.ObjectId, ref: 'Comment'},
    replies: {type: Number, default: 0},
    createdAt: {type: Date,  default: Date.now()},
    updatedAt: {type: Date,  default: Date.now()},
})

threadSchema.pre('save', function(next){
    this.replies = this.commentsID.length
    this.updatedAt = Date.now()
    next()
})

const Thread = mongoose.model('Thread', threadSchema)
module.exports = Thread