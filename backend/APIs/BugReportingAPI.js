const { Router } = require('express')
const BugsDBModel = require('../DB/BugsDBModel')
const router = Router ()

router.post('/reportBug', (req, res) => {
    const bug_data = req.body
    const bugToReport = new BugsDBModel(bug_data)
    bugToReport.save()
})

module.exports = router