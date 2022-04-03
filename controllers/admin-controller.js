const answerService = require('../services/answer-service')
const formService = require('../services/form-service')
const historyService = require('../services/history-service')
const userService = require('../services/user-service')

class AdminController {

    async enter(req, res, next) {
        try {
            res.json(req.user)
        } catch (error) {
            next(error)
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getUsers()
            res.json(users.map(e => e.dataValues))
        } catch (error) {
            next(error)
        }
    }

    async getUSerInfo(req, res, next) {
        try {
            const {id} = req.body
            const forms = await formService.get(id)
            const proposals = await answerService.get(id) 
            const history = await historyService.get(id)
            res.json({forms, proposals, history:history.map(e => e.dataValues)})
        } catch (error) {
            next(error)
        }
    }

    async updateUser(req, res, next) {
        try {
            const {id, start, stop, status} = req.body
            await historyService.create(id, start, stop)
            await userService.updateByAdmin(id, {status})
            const users = await userService.getUsers()
            res.json(users.map(e => e.dataValues))
        } catch (error) {
            next(error)
        }
    }

    async updateActiveUser(req, res, next) {
        try {
            const {id, stop, status} = req.body
            await historyService.update(id, stop)
            await userService.updateByAdmin(id, {status})
            const users = await userService.getUsers()
            res.json(users.map(e => e.dataValues))
        } catch (error) {
            next(error)
        }
    }

    async getHistory(req, res, next) {
        try {
            const {id} = req.body
            
        } catch (error) {
            next(error)
        }
    }



}


module.exports = new AdminController()