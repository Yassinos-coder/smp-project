const express = require('express')
const cors = require('cors')
const mongoose  = require("mongoose")
const UserRouter = require('./APIs/userAPI')
const BugReportingRouter = require('./APIs/BugReportingAPI')
const StudentsRouter = require('./APIs/StudentsAPI')
const ClassroomsRouter = require('./APIs/ClassroomsAPI')
const LevelRouter = require('./APIs/LevelAPI')
const TaskRouter = require('./APIs/TasksAPI')
const NotifyerRouter = require('./APIs/NotifyerAPI')
const NotifyerRoleRouter = require('./APIs/NotifByRole')
const TeachersRouter = require('./APIs/TeachersAPI')
const fileupload = require("express-fileupload")
require('dotenv').config()

const app = express()
let db_success;

app.use(express.static('uploads'))
app.use(express.json())
app.use(cors())
app.use(fileupload())
app.listen(process.env.BACK_END, ()=> console.info(`Server Up and running on port ${process.env.BACK_END}`))
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, ()=> 
    {db_success = true
    console.info('Database connection granted')})
app.use(UserRouter)
app.use(BugReportingRouter)
app.use(StudentsRouter)
app.use(ClassroomsRouter)
app.use(LevelRouter)
app.use(TaskRouter)
app.use(NotifyerRouter)
app.use(NotifyerRoleRouter)
app.use(TeachersRouter)

app.get('/', (req, res) => {
    res.send(true)
})

app.get('/DBStatus', (req, res) => {
    res.send(db_success)
})
