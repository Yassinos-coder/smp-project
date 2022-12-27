const { Router } = require('express')
const NotifyerDBModel = require('../DB/NotifyerDBModel')
const router = Router()

router.get('/GetNotif/:username', async(req, res) => {
    let username= req.params.username
    try {
        let AllNotifOfUsr = await NotifyerDBModel.find({notif_to_user: username})
        res.send(AllNotifOfUsr)
    } catch (err) {
        console.error('Error Regarding API GetNotif', err)
    }
})

router.post('/SendNotif', async(req, res) => {
    let newNotif = req.body
    try {
        const Notif = new NotifyerDBModel(newNotif)
        Notif.save()
        const updatedNotif = await NotifyerDBModel.find({notif_to_user: newNotif.username})  
        res.send(updatedNotif)
    } catch (err) {
        console.error('Error Regarding SendNotif()', err)
    }
})

router.post('/deleteAllNotif/:username/', async (req, res) => {
    let username = req.params.username
    try {
        await NotifyerDBModel.deleteMany({notif_to_user: username})
        const updatedNotif = await NotifyerDBModel.find({notif_to_user: username}) 
        res.send(updatedNotif) 
    } catch (err) {
        console.error('Error Regarding deleteNotif()', err)
    }
})

router.post('/markRead/:username/:notifid', async(req, res) => {
    let notifid = req.params.notifid
    let username = req.params.username
    let readUpdate = req.body
    console.log(readUpdate)
    try {
        await NotifyerDBModel.updateOne({_id: notifid, read:readUpdate.readUpdate})
        const newNotifList = await NotifyerDBModel.find({notif_to_user: username})
        console.log(newNotifList)
        res.send(newNotifList)
    } catch (err) {
        console.error('Error Regarding MarkReadAPI', err)
    }
})

module.exports = router