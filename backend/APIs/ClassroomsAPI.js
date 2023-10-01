const { Router } = require('express')
const ClassroomDBModel = require('../DB/ClassroomDBModel')

const router = Router()

router.get('/GetClassrooms', async(req,res) => {
    try {
        let classrooms = await ClassroomDBModel.find({})
        res.send(classrooms)
    } catch (err) {
        console.error(err)
    }
})

router.post('/AddClassroom', async(req, res) => {
    let newClass = req.body

    try {
        let result = await ClassroomDBModel.findOne({code: newClass.code})
        if (result) {
            res.send('Already Exists')
        } else {
            let newClassToDB = new ClassroomDBModel(newClass)
            newClassToDB.save()
            res.send(true)
        }
    } catch (err) {
        console.error(err)
    }
})

router.post('/DeleteClassroom/:classroomcode/:levelcode', async (req, res) => {
    let classroomcode = req.params.classroomcode
    let levelcode = req.params.levelcode
    console.log(classroomcode, levelcode)
    try {
        let result = await ClassroomDBModel.findOne({code: classroomcode, level: levelcode})
        if (result) {
            await ClassroomDBModel.deleteOne({code: classroomcode}, {level: levelcode})
            console.log(`${classroomcode} group deleted successfuly !`)
            let updatedClassroomListDB = await ClassroomDBModel.find()
            res.send(updatedClassroomListDB)
        } else {
            console.log(`${classroomcode} doesn't exists`)
        }
    } catch (err) {
        console.error('Error regarding DeleteClassroom ',err)
    }
})

router.post('/EditClassroom/:classroomcode/:levelcode', async (req, res) => {
    let classroomcode = req.params.classroomcode
    let levelcode = req.params.levelcode
    let newClassroomData = req.body
    try {
        let result = await ClassroomDBModel.findOne({code: classroomcode}, {level: levelcode})
        if (result) {
            await ClassroomDBModel.updateOne({name: newClassroomData, name: newClassroomData, name: newClassroomData})
            console.log(`${classroomcode} group updated successfuly !`)
        } else {
            console.log(`${classroomcode} doesn't exists`)
        }
    } catch (err) {
        console.error('Error regarding DeleteClassroom ',err)
    }
})

module.exports = router