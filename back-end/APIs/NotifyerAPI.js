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

router.post('/DeleteNotif/:username/:notifID', async (req, res) => {
    let username = req.params.username
    let notifID = req.params.notifID
    try {
        await NotifyerDBModel.deleteOne({_id: notifID})
        const updatedNotif = await NotifyerDBModel.find({notif_to_user: username}) 
        res.send(updatedNotif) 
    } catch (err) {
        console.error('Error Regarding deleteNotif()', err)
    }
})


module.exports = router