const {  mongoose } = require('mongoose')
const db = require('mongoose')

const StudentsAccounts = db.Schema({ 
    profile_pic: {
        type: String
    },
    firstname : {
        type : String, 
        required : true
    },
    lastname : {
        type : String, 
        required : true
    },
    dob : {
        type : String, 
        required : true
    },
    address : {
        type : String, 
        required : true
    },
    phonenumber : {
        type : String, 
        required : true
    },
    email : {
        type : String, 
        required : true
    },
    password : {
        type : String, 
        required : true
    },
    level : {
        type : String, 
        required : true
    },
    classroom_group : {
        type : String, 
        required : true
    },
    father_name : {
        type : String, 
        required : true
    },
    father_cin : {
        type : String, 
        required : true
    },
    mother_name : {
        type : String, 
        required : true
    },
    mother_cin : {
        type : String, 
        required : true
    },
})



const StudentsDBModel = mongoose.model('students_accounts', StudentsAccounts)

module.exports = StudentsDBModel