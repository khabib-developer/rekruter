const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const formController = require('../controllers/form-controller')

router.post('/create', auth, formController.create)

router.post('/remove', auth, formController.remove)

router.get('/getForms', auth, formController.get)

router.get('/getForm/:token', formController.getOne)



module.exports = router
