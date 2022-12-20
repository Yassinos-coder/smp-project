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
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())
app.listen(process.env.BACK_END, ()=> console.info(`Server Up and running on port ${process.env.BACK_END}`))
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, ()=> console.info('Database connection granted'))
app.use(UserRouter)
app.use(BugReportingRouter)
app.use(StudentsRouter)
app.use(ClassroomsRouter)
app.use(LevelRouter)
app.use(TaskRouter)
app.use(NotifyerRouter)

app.get('/', (req, res) => {
    res.send(`<h1> Get  outta here ! what you tryna do !?!?
    <br /> Go here <a href="http://localhost:3000">Exit</a>
    </h1>`)
})
