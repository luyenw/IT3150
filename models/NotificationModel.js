const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema({
    to: {type: mongoose.Types.ObjectId, ref: 'User'},
    content: {type: String},
    createdAt: {type: Date, default: Date.now()}
})

notificationSchema.pre('save', function(next){
    next()
})

module.exports = mongoose.model('Notification', notificationSchema)