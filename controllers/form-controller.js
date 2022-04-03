const { isJson } = require("../functions")
const formService = require("../services/form-service")
const userService = require("../services/user-service")

class FormController {

    async create(req, res, next) {
        try {
            const {id} = req.user
            const {structure, title, jobs} = req.body
            const form = await formService.create(id, title, structure, jobs)
            res.json(form)
        } catch (error) {
            console.log(error)
            next(error)
        }
        
    }

    async get(req, res, next) {
        try {
            const {id} = req.user
            const form = await formService.get(id)
            res.json(form)
        } catch (error) {
            next(error)
        }
    }

    async getOne(req, res, next) {
        try {
            const {token} = req.params
            const form = await formService.getOne(token)
            const user = await userService.getUser(form.user_id)

            const status = isJson(user.status)?JSON.parse(user.status):user.status
            if(typeof status !== 'string') {
                if(+status.date<Date.now()) {
                    form.notFounded = true
                }
            }
            
            res.json(form)
        } catch (error) {
            next(error)
        }
    }

    async remove(req, res, next) {
        try {
            const {id, resume} = req.user
            const {token} = req.body
            await formService.remove(token)
            res.json({token})
        } catch (error) {
            next(error)
        }
       
    }
}

module.exports = new FormController()