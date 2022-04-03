const {Router} = require('express')
const {check} = require('express-validator')
const router = Router()
const upload = require('../middleware/file.middleware')
const auth = require('../middleware/auth.middleware')
const {userController} = require('../controllers/user-controller')


router.post('/register',
	[   check('phone', 'minimalnaya dlina telefon nomera 13 simvolov')
        .isLength({min:13}),
		check('password', 'minimalnaya dlina parolya 6 simvolov')
		.isLength({min:4}),
		check('email', 'nekorrektniy email').isEmail()
	],
	userController.registration
)
router.post('/activate', userController.activate)
router.post('/login', 
	[
		check('phone', 'minimalnaya dlina telefon nomera 13 simvolov')
        .isLength({min:13}),
		check('password', 'minimalnaya dlina parolya 4 simvolov')
		.isLength({min:4})
	],
	userController.login
)

router.get('/refresh', userController.refresh)

router.get('/logout', userController.logout)

router.get('/isUser', auth, userController.isUser)

router.post('/update', auth, userController.update)

router.post('/image', auth, upload.single('file'), userController.image)

router.post('/video', auth, upload.single('file'),userController.video)

router.get('/deletePhoto', auth, userController.image)

router.get('/deleteVideo', auth, userController.video)

module.exports = router