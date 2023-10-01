const {mongoose } = require('mongoose')
const db = require('mongoose')

const NotifyerRoleModel = db.Schema({
    notif_from_user : {
        type: String,
        ref: 'users',
        required: true
    },
    notif_to_role : {
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


const NotifyerbyroleDBModel = mongoose.model('role_notifications', NotifyerRoleModel)

module.exports = NotifyerbyroleDBModel
