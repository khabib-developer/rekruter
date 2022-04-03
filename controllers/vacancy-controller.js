const ApiError = require("../exception/api-errors")
const telegramService = require("../services/telegram-service")
const userService = require("../services/user-service")
const vacancyService = require("../services/vacancy-service")

class VacancyController {

    async create(req, res, next) {
        try {
            const {id} = req.user 
            const data = await vacancyService.create(id, req.body)
            res.json(data)
        } catch (error) {
            next(error)
        }
    }

    async read(req, res, next) {
        try {
            const offset = Number(req.params.offset)
            const vacancy = await vacancyService.read(offset)
            res.json(vacancy)
        } catch (error) {
            next(error)
        }
    }

    async get(req, res, next) {
        try {
            const {id} = req.user
            const vacancy = await vacancyService.get(id)
            res.json(vacancy)
        } catch (error) {
            next(error)
        }
    }

    async createProposal(req, res, next) {
        try {
            const {vacancy_id, text} = req.body
            const {id, type} = req.user
            if(type === 0)
                return next(ApiError.BadRequest("Ctobi otkliknutsya na rabotu vi doljni bit rabotayushiy"))
            const isHaveProposal = await vacancyService.isHaveProposal(id, vacancy_id)
            if(isHaveProposal)
                return next(ApiError.BadRequest("вы уже откликнулись на эту работу "))
            const proposal = await vacancyService.createProposal(id, req.body)
            const user = await userService.getUser(id)
            if(user.telegram_id) {
                await telegramService.sendCodeTelegram(user.telegram_id, "Noviy LID")
            }
            emitter.emit('message', {id:user.user_id, state: state.proposal})
            res.json(proposal)
        } catch (error) {
            next(error)
        }
    }

    async getProposal(req, res, next) {
        try {
            const {id, type} = req.user
            const proposals = await vacancyService.getProposal(id, type)
            res.json(proposals)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async update(req, res, next) {
        try {
            const {id} = req.body
            await vacancyService.update(id, req.body)
            const proposals = await vacancyService.getProposal(req.user.id, 0)
            res.json(proposals)
        } catch (error) {
            next(error)
        }
    }
    async remove(req, res, next) {
        try {
            const {id} = req.params
            await vacancyService.remove(id)
            res.json({ok:true})
        } catch (error) {
            next(error)
        }
       
    }

}

module.exports = new VacancyController()