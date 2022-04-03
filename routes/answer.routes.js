const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const answerController = require('../controllers/answer-controller')
const upload = require('../middleware/file.middleware')

router.post('/create', answerController.create)

router.get('/remove/:id', auth, answerController.remove)

router.get('/get', auth, answerController.get)

router.post('/update', auth, answerController.update)

router.post('/file/:folder', upload.single('file'), answerController.file)


module.exports = router
