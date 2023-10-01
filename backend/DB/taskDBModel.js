const {  mongoose } = require('mongoose')
const db = require('mongoose')

const Tasks = db.Schema({ 
    userid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    task : {
        type: String,
        required: true
    }

})

const taskDBModel = mongoose.model('user_tasks', Tasks)

module.exports = taskDBModel