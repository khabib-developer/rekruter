const {Router} = require('express')
const router = Router()
const upload = require('../middleware/file.middleware')
const auth = require('../middleware/auth.middleware')
const resumeController = require('../controllers/resume-controller')

router.post('/create', auth, resumeController.create)

router.post('/load', auth, upload.single('file'), resumeController.load)

router.get('/user/:id', resumeController.getUserData)

module.exports = router
