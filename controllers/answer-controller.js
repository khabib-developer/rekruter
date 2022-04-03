const answerService = require("../services/answer-service")
const formService = require("../services/form-service")
const ApiError = require("../exception/api-errors")
const userService = require("../services/user-service")
const telegramService = require("../services/telegram-service")
const { emitter } = require("./events-controller")
const state = require("../state")

class FormController {

    async create(req, res, next) {
        try {
            const {token, data} = req.body
            const form = await formService.getOne(token)
            if(form) {
                const asnwer = await answerService.create(token, data, form.title, form.user_id)
                const user = await userService.getUser(form.user_id)
                if(user.telegram_id) {
                    await telegramService.sendCodeTelegram(user.telegram_id, "Noviy lid")
                }
                emitter.emit('message', {id:form.user_id, state: state.proposal})
                return res.json(asnwer)
            }
            return next(ApiError.BadRequest("Dannaya forma uje ne sush")) 
            
        } catch (error) {
            console.log(error)
            next(error)
        }
        
    }

    async file(req, res, next) {
        try {
            console.log(req.params)
            console.log(req.file)
            if(req.file) {
                return res.json({src:req.file.filename})
            }
            next(ApiError.BadRequest('Cto to poshlo ne tak'))
        } catch (error) {
            next(error)
        }
    }

    async get(req, res, next) {
        try {
            const {id} = req.user
            const answer = await answerService.get(id)
            res.json(answer)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.user
            await answerService.update(req.body.id, req.body)
            const answer = await answerService.get(id)
            res.json(answer)
        } catch (error) {
            next(error)
        }
    }

    async remove(req, res, next) {
        try {
            const {id} = req.params
            await answerService.remove(id)
            res.json({ok:true})
        } catch (error) {
            next(error)
        }
       
    }
}

module.exports = new FormController()