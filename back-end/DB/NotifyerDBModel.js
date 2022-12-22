const {mongoose } = require('mongoose')
const db = require('mongoose')

const NotifyerModel = db.Schema({
    notif_from_user : {
        type: String,
        ref: 'users',
        required: true
    },
    notif_to_user : {
        type: String,
        ref: 'users',
        required: true
    },
    notif_subject : {
        type: String,
        required: true
    },
    notif_msg : {
        type: String,
        required: true
    },
    read : {
        type: Boolean,
        required: true
    },
})


const NotifyerDBModel = mongoose.model('users_notifications', NotifyerModel)

module.exports = NotifyerDBModel
