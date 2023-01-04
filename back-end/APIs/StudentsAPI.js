const { Router } = require('express')
const StudentsAccountsDBModel = require('../DB/StudentsAccountsDBModel')
const router = Router()
const fs = require('fs')


router.post('/AddStudent', async(req, res) => {
    let student = req.body
    try {
        const newStudent = new StudentsAccountsDBModel(student)
        let updatedStudentList = await newStudent.save()
        res.send(updatedStudentList)
        console.log('Student Inserted !')
    } catch (err) {
        console.error(err)
    }
})

router.get('/GetStudents',async(req, res) => {
    let students = await StudentsAccountsDBModel.find()
    if (students) {
        res.send(students)
    } else {
        console.log('No Students in DB')
    }
})

//Still not working 

router.post('/profilePictureUpload', async(req, res) => {
    let imageProfile = req.body
    try {
        console.log(imageProfile)
    } catch (err) {
     console.error('Error regarding profilePictureUpload API', err)   
    }
})

module.exports = router