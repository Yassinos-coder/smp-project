const {  mongoose } = require('mongoose')
const db = require('mongoose')

const Users = db.Schema({
    schoolid: {
        type: String,
        required : false
    },
    avatar: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required : true
    },
    firstname: {
        type: String,
        required : false
    },
    lastname: {
        type: String,
        required : false
    },
    dob: {
        type: String,
        required : false
    },
    email: {
        type: String,
        required : true
    },
    cin: {
        type: String,
        required : false
    },
    address: {
        type: String,
        required : true
    },
    phonenumber: {
        type: Number,
        required : false
    },
    password: {
        type: String,
        required : true
    },
    role: {
        type: String,
        required: true
    },
})

const UsersDBModel = mongoose.model('users', Users)

module.exports = UsersDBModel