const {  mongoose } = require('mongoose')
const db = require('mongoose')

const Classrooms = db.Schema({
    name: {
        type: String,
        required: true
    },
    level :{
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
})

const ClassroomDBModel = mongoose.model('classrooms', Classrooms)
module.exports = ClassroomDBModel