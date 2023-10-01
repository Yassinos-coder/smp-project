const {mongoose} = require('mongoose')
const db = require('mongoose')

const Levels = db.Schema({
    levelname: {
        type: String,
        required:true
    },
    leveltype: {
        type: String,
        required:false
    },
    levelcode: {
        type: String,
        required:true
    },
})


const LevelDBModel = mongoose.model('level_list', Levels)
module.exports = LevelDBModel