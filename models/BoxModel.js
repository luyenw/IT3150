const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)
const Schema = mongoose.Schema

const boxSchema = new Schema({
    title: {type: String, require: true},
    slug: {type: String, slug: "title", unique: true},
    forumsID: [{type: Schema.Types.ObjectId, ref: 'Forum'}]
})

boxSchema.pre('save', function(next){
    next()
})

module.exports = mongoose.model('Box', boxSchema)