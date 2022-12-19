const { Router } = require('express')
const LevelDBModel = require('../DB/LevelDBModel')

const router = Router()

router.get('/GetLevels', async(req, res) => {
    try {
        let allLevels = await LevelDBModel.find()
        res.send(allLevels)
    } catch (err) {
        console.error(err)
    }
})


router.post('/AddLevel', async(req,res) => {
    let levelData = req.body
    console.log(levelData)
    try {
        let result = await LevelDBModel.findOne({levelname: levelData.levelname})
        if (result) {
            res.send('Already Exists')
        } else {
            const newLevel = new LevelDBModel(levelData)
            newLevel.save()
            res.send(true)
        }
    } catch (err) {
        console.error(err)
    }
})

router.post('/DeleteLevel/:levelToDelete', async(req, res)=> {
    let level = req.params.levelToDelete
    try {
        const result = await LevelDBModel.findOne({levelcode: level})
        if (result) {
            await LevelDBModel.deleteOne({levelcode: level})
            console.log(`Level of code : ${level}, Deleted !`)
            let updatedLevelist = await LevelDBModel.find({})
            res.send(updatedLevelist)
        } else {
            res.send('Level doesn\'t exists')
        }
    } catch (err) {
        console.error(err)
    }
})

router.post('/EditLevel/:level', async(req,res) => {
    let level = req.params.level
    let newLevelData = req.body
    try {
        let result = await LevelDBModel.findOne({code: level})
        if (result) {
            await LevelDBModel.updateOne({levelcode: level}, {levelname: newLevelData.levelname, levelcode: newLevelData.levelcode, leveltype: newLevelData.leveltype})
            let updatedLevelList = await LevelDBModel.find({})
            res.send(updatedLevelList)
            console.log(`Level of code : ${level}, Updated !`)
        } else {
            
        }
    } catch (err) {
        console.error(err)
    }
})



module.exports = router