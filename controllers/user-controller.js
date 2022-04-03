const userService = require('../services/user-service')
const {validationResult} = require('express-validator')
const ApiError = require('../exception/api-errors')
const tokenService = require('../services/token-service')
const folderServise = require('../services/file-service')
const { validateActive } = require('../functions')
class UserController {

    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                next(ApiError.BadRequest("ne korrektnie dannie pri vxode", errors.array()))
            }
            const id = await userService.registration(req.body)
            res.json({id})
        } catch (error) {
            next(error)
        }
    }

    async activate(req, res, next) {
        try {
            await UserController.response(req, res, next)
        } catch (error) {
            next(error)
        }
    }


    async login(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                next(ApiError.BadRequest("ne korrektnie dannie pri vxode", errors.array()))
            }
            await UserController.response(req, res, next, userService.login)
            
        } catch (error) {
            next(error)
        }
    }

    async isUser(req, res, next) {
        try {
            const user = await userService.getUser(req.user.id)
            console.log({...req.user, status:user.status})
            if(validateActive(user.status)) {
                res.json({...req.user, status:user.status})
            } else {
                next(ApiError.Expired())
            }
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.user
            // const data = userService.update(id, req.body)
            await UserController.response(req, res, next, userService.update, false,  id, req.body)
        } catch (error) {
            next(error)
        }
    }

    async image(req, res, next) {
        try {
            const {photo, id} = req.user
            if(req.file) {
                if(photo) {
                    folderServise.delete('images',photo)
                }
                return await UserController.response(req, res, next, userService.update, false,  id, {photo:req.file.filename})
            }
            folderServise.delete('images',photo)
            await UserController.response(req, res, next, userService.update, false,  id, {photo:null})
        } catch (error) {
            next(error)
        }
    }
    
    async video(req, res, next) {
        try {
            const {video, id} = req.user
            if(req.file) {
                if(video) {
                    folderServise.delete('video',video)
                }
                return await UserController.response(req, res, next, userService.update, false,  id, {video:req.file.filename})
            }
            folderServise.delete('video', video)
            await UserController.response(req, res, next, userService.update, false,  id, {video:null})
        } catch (error) {
            next(error)
        }
    }


    async logout(req, res, next) {
         
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            await UserController.response(req, res, next, userService.refresh, refreshToken)
        } catch (error) {
            next(error)
        }
    }

    

    static async response(req, res, next, action = userService.activate, data = null, ...additional) {
        try {
            async function f(...body) {
                return await action(...body)
            }
            let arg = req.body
            if(data) arg = data 
            const userData = await f(...additional, arg)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json(userData)
        } catch (error) {
            next(error)
        }
    }

}


module.exports = {userController:new UserController(), UserController}