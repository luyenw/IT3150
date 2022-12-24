const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)
const Schema = mongoose.Schema

const forumSchema = new Schema({
    title: {type: String, require: true},
    slug: {type: String, slug: "title", unique: true},
    total_threads: {type: Number, default: 0},
    threadsID: [{type: Schema.Types.ObjectId, ref: 'Thread'}],
    lastThread: {type: Schema.Types.ObjectId, ref: 'Thread'},
    boxID: {type: Schema.Types.ObjectId, ref: 'Box'},
    total_messages: {type:  Number, default: 0}
})

forumSchema.pre('save', function(next){
    this.total_threads = this.threadsID.length
    next()
})

const Forum = mongoose.model('Forum', forumSchema)
module.exports = Forum