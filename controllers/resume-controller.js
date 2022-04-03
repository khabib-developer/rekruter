const fileService = require("../services/file-service")
const resumeService = require("../services/resume-service")
const userService = require("../services/user-service")
const { UserController } = require("./user-controller")


class ResumeController {

    async create(req, res, next) {
        try {
            const {id, resume} = req.user
            const {htmlstring} = req.body
            if(resume) fileService.delete('resume', resume)
            await UserController.response(req, res, next, resumeService.create, null, id, htmlstring)
        } catch (error) {
            next(error)
        }
        
    }

    async load(req, res, next) {
        try {
            const {id, resume} = req.user
            if(req.file) {
                const {filename} = req.file
                if(resume) fileService.delete('resume',resume)
                await UserController.response(req, res, next, userService.update, null, id, {resume:filename})
            }
        } catch (error) {
            next(error)
        }
       
    }

    async getUserData(req, res, next) {
        try {
            const userData = await userService.getUser(req.params.id)
            res.json(userData)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ResumeController()