const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const vacancyController = require('../controllers/vacancy-controller')

router.post('/create', auth, vacancyController.create)

router.get('/read/:offset', vacancyController.read)

router.post('/createBid', auth, vacancyController.createProposal)

router.get('/getBid', auth, vacancyController.getProposal)

router.get('/get', auth, vacancyController.get)

router.post('/updateBid', auth, vacancyController.update)

router.get('/remove/:id', auth, vacancyController.remove)

module.exports = router
