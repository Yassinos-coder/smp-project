const { Router } = require('express')
const UsersDBModel = require('../DB/UsersDBModel')

const router = Router()

router.get('/GetAllUsersList', async(req, res) => {
    try {
        const allUsers = await UsersDBModel.find({},{_id:0,username:true});
        res.send(allUsers)
    } catch (err) {
        console.error('Error Regarding GetAllUsersList', err)
    }
})

router.post('/AddAccount', async (req,res) => {
    let user_data = req.body
    try {
        let result = await UsersDBModel.findOne({username: user_data.username})
        if (result) {
            res.send('Username Taken')
            console.log('Username Taken')
        } else {
            const newUser = new UsersDBModel(user_data)
            console.log(newUser)
            newUser.save()
            console.log('User inserted')
        }
    } catch (error) {console.error(error.message)}
})

router.get('/GetUserData/:id', async(req,res) => {
    let id = req.params.id
    try {
        let account_data = await UsersDBModel.findOne({_id:id})
        res.send(account_data)
    } catch (err) {
        console.error(err)
    }
})

router.get('/GetUserID/:username', async(req,res) => {
    let username_fe = req.params.username
     try {
        const userID = await UsersDBModel.findOne({username: username_fe}, {_id:1})
        res.send(userID)
     } catch (err) {
        console.error(err)
     }
})

router.post('/Signin', async (req,res) => {
    let entred_credentials = req.body
    try {
        let doesUserPassExist = await UsersDBModel.findOne({username: entred_credentials.uname, password: entred_credentials.passwd})
        if (doesUserPassExist) {
            res.send(true)
        } else {
            res.send(false)
        }
    } catch (err) {
        console.error(err)
    }
})

router.post('/updateMail/:id', async(req,res) => {
    let id = req.params.id
    let newMail = req.body
    // console.log(newMail.newMail)
    let checkIfMailisCorrect = await UsersDBModel.findOne({_id: id })
    try {
        if (checkIfMailisCorrect) {
            await UsersDBModel.updateOne({_id:id,email: newMail.newMail})
            res.send(true)
        } else {
            
        }
    } catch (err) {
        console.error(err)
    }
})

router.post('/updatePassword/:id', async(req,res) => {
    let id = req.params.id
    let newPassword = req.body
    // console.log(newPassword.newPassword)
    let checkIfPasswordisCorrect = await UsersDBModel.findOne({_id: id })
    try {
        if (checkIfPasswordisCorrect) {
            await UsersDBModel.updateOne({_id:id, password: newPassword.newPassword})
            res.send(true)
        } else {
            
        }
    } catch (err) {
        console.error(err)
    }
})

module.exports = router