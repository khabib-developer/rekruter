const multer = require("multer")
const path = require('path')
const {User} = require('../db/index.js')
const randomstring = require("randomstring");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		if(req.user) {
			if(req.url === '/image') {
				cb(null,  path.join(path.dirname(__dirname),'/static/images/'))
			} else if(req.url === '/video') {
				cb(null,  path.join(path.dirname(__dirname),'/static/video/'))
			} else {
				cb(null,  path.join(path.dirname(__dirname),'/static/resume/'))
			}
		} else {
			const {folder} = req.params
			cb(null,  path.join(path.dirname(__dirname),`/static/${folder}/`))
		}
        
	},
	filename: async (req, file, cb) => {
		try {
			if(req.user) {
				const {id} = req.user
				const user = await User.findOne({where:{id}})
				if(user) {
					cb(null, id+"_"+Date.now()+path.extname(file.originalname))
				} 
			} else {
				cb(null, randomstring.generate()+"_"+Date.now()+path.extname(file.originalname))
			}
			
		} catch (error) {
			console.log(error)
		}
		
	}
})

module.exports = multer({
    storage: storage
})