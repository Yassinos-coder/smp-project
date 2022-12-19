const { Router } = require('express')
const taskDBModel = require('../DB/taskDBModel')

const router = Router()

router.get('/getTasks/:userid', async(req, res)=> {
    let userid = req.params.userid
    try {
        let tasks = await taskDBModel.find({userid : userid})
        res.send(tasks)
    } catch (err) {
        console.log('error in getTasks', err)
    }
})

router.post('/AddTask', async(req,res) => {
    let taskData = req.body
    let userid = taskData.userid
    try {
        const newTask = new taskDBModel(taskData)
        newTask.save()
        const updatedTasks = await taskDBModel.find({userid: userid})
        res.send(updatedTasks)
    } catch (err) {
        console.error('error in AddTask', err)
    }
})

router.post('/deleteTask/:userid/:taskid', async(req,res) => {
    let taskid = req.params.taskid
    let userid = req.params.userid
    try {
       let result = await taskDBModel.findOne({_id:taskid})
        if (result) {
            await taskDBModel.deleteOne({_id: taskid})
            const updatedTask = await taskDBModel.find({userid: userid})
            res.send(updatedTask)
        } else {
            console.log('Task found but couldn\'t delete' )
        }
    } catch (err) {
        console.error('error in deleteTask', err)
    }
})

router.post('/modifyTask/:userID/:taskID', async(req, res) =>{
    let taskID= req.params.taskID
    let userID = req.params.userID
    let updatedTask = req.body
    console.log(req.body)
    try {
        let result = await taskDBModel.findOne({_id: taskID })
        if (result) {
            await taskDBModel.updateOne({_id: taskID, task: updatedTask.updatedTask})
            console.log(`Task of id:${taskID} was updated to ${updatedTask.updatedTask}`)
            let updatedTasks = await taskDBModel.find({userid: userID})
            res.send(updatedTasks)
        } else {
            console.log('No such task was found')
        }
    } catch (err) {
        console.error('Error regarding modifyTask()',err)
    }
})

module.exports = router