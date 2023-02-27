const mongoose = require('mongoose')
const Schema = mongoose.Schema


// type: 0 - reply
//       1 - comment

const notificationSchema = new Schema({
    fromID: {type: mongoose.Types.ObjectId, ref: 'User'},
    toID: {type: mongoose.Types.ObjectId, ref: 'User'},
    forumID: {type: mongoose.Types.ObjectId, ref: 'Forum'},
    threadID: {type: mongoose.Types.ObjectId, ref: 'Thread'},
    createdAt: {type: Date, default: Date.now()}
})

notificationSchema.pre('save', function(next){
    console.log('new reply')
    next()
})

module.exports = mongoose.model('Notification', notificationSchema)