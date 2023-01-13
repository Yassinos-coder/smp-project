const {Router} = require('express')
const TeachersDBModel = require('../DB/TeachersDBModel')
const UsersDBModel = require('../DB/UsersDBModel')

const router = Router() 


router.get('/GetTeacher', async(req, res) => {
    try {
        const Teachers = await UsersDBModel.find({role: 'Teacher'})
        res.send(Teachers)
    } catch (err) {
        console.error('Error in GetTeacher' ,err)
    }
})

router.get('/LevelsOfTeaching/:id', async(req, res) => {
    let id = req.params.id
    try {
        const levelOfTeaching = await TeachersDBModel.find({teacherID: id}, {level:1})
        res.send(levelOfTeaching)
    } catch (err) {
        console.error('Error in LevelsOfTeaching', err)
    }
})

router.get('/ClassroomsOfTeaching/:id', async(req, res) => {
    let id = req.params.id
    try {
        const ClassroomsOfTeaching = await TeachersDBModel.find({teacherID: id}, {classroomGroup:1})
        res.send(ClassroomsOfTeaching)
    } catch (err) {
        console.error('Error in LevelsOfTeaching', err)
    }
})


module.exports = router