const {Router} = require('express')
const router = Router()
const {eventsController} = require('../controllers/events-controller')
const auth = require('../middleware/auth.middleware')

router.get('/connect', auth, eventsController.connect )

module.exports = router
