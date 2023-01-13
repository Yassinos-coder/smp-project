const {  mongoose } = require('mongoose')
const db = require('mongoose')

const Teachers = db.Schema({
    teacherID : {
        ref:'users',
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    classroomGroup: {
        type: String,
        required: true
    }
})

const TeachersDBModel = mongoose.model('teachers_management', Teachers)

module.exports = TeachersDBModel