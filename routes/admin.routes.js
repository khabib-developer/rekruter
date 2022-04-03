const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const admin = require('../middleware/admin.middleware')
const adminController = require('../controllers/admin-controller')


router.get('/enter', auth, admin, adminController.enter) 

router.get('/getUsers', auth, admin, adminController.getUsers) 


router.post('/updateUser', auth, admin, adminController.updateUser)

router.post('/getUserInfo', auth, admin, adminController.getUSerInfo ) 

router.post('/getHistory', auth, admin, adminController.getHistory)

router.post('/updateActiveUser', auth, admin, adminController.updateActiveUser)

module.exports = router