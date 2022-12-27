const { Router } = require('express')
const NotifyerbyroleDBModel = require('../DB/NotifbyroleDBModel')

const router = Router()

router.get('/getRoleNotif/:role', async(req, res) => {
    let role = req.params.role
    try {
        const allnotifbyrole = await NotifyerbyroleDBModel.find({notif_to_role: role})
        res.send(allnotifbyrole)
    } catch (err) {
        console.error('Error regarding getRoleNotif', err)
    }
})

router.post('/sendNotifRole', async(req, res) => {
    let newNotifData = req.body
    console.log(newNotifData)
    try {
        const newNotif = new NotifyerbyroleDBModel(newNotifData)
        newNotif.save()
    } catch (err) {
        console.error('Error Regarding sendNotiftRole', err)
    }
})

router.post('/DeleteNotifByRole/:role/:notifID', async (req, res) => {
    let role = req.params.username
    let notifID = req.params.notifID
    try {
        await NotifyerDBModel.deleteOne({_id: notifID})
        const updatedNotif = await NotifyerbyroleDBModel.find({notif_to_role: role}) 
        res.send(updatedNotif) 
    } catch (err) {
        console.error('Error Regarding deleteNotif()', err)
    }
})

router.post('/markReadByRole/:role/:notifid', async(req, res) => {
    let notifid = req.params.notifid
    let role = req.params.role
    let readUpdate = req.body
    console.log(readUpdate)
    try {
        await NotifyerDBModel.updateOne({_id: notifid, read:readUpdate.readUpdate})
        const newNotifList = await NotifyerbyroleDBModel.find({notif_to_role: role})
        console.log(newNotifList)
        res.send(newNotifList)
    } catch (err) {
        console.error('Error Regarding MarkReadAPI', err)
    }
})



module.exports = router