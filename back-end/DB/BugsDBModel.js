const {  mongoose } = require('mongoose')
const db = require('mongoose')

const bug_reports = db.Schema({
    fullname: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required : true
    },
    subject: {
        type: String,
        required : true
    },
    bug: {
        type: String,
        required : true
    },
})

const BugsDBModel = mongoose.model('bug_reports', bug_reports)

module.exports = BugsDBModel