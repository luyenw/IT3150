const mongoose = require('mongoose')
const Schema = mongoose.Schema


// type: 0 - reply
//       1 - comment

const notificationSchema = new Schema({
    fromID: {type: mongoose.Types.ObjectId, ref: 'User'},
    toID: {type: mongoose.Types.ObjectId, ref: 'User'},
    type: {type: Number, default: 1},
    createdAt: {type: Date, default: Date.now()}
})

notificationSchema.pre('save', function(next){
    next()
})

module.exports = mongoose.model('Notification', notificationSchema)