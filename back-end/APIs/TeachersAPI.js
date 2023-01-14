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

router.post('/assignClass/:teacher_id/:level/:classroomGroup', async(req, res ) => {
    let teacher_id = req.params.teacher_id
    let level = req.params.level
    let classroomGroup = req.params.classroomGroup

    try {
        const newLevel = new TeachersDBModel({
            teacherID: teacher_id,
            level: level,
            classroomGroup: classroomGroup
        })
        await newLevel.save()
        res.send(newLevel)
    } catch (err) {
        console.error('Error in assignClass', err)
    }
})


module.exports = router