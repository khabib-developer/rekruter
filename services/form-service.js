const config = require('config')
const jwt = require('jsonwebtoken')
const {Form} = require('../db/index.js')

class FormService {
    async create(user_id, title, structure, jobs) {
        const date = Date.now()
        const token = `${user_id}_${date}`
        return await Form.create({user_id,token, title, structure, jobs, date, status:1})
    }

    async get(user_id) {
        const res = await Form.findAll({where:{user_id, status:1}})
        return res.map(e => e.dataValues)
    }

    async getOne(token) {
        const form = await Form.findOne({where:{token}})
        if(form) 
            return form.dataValues
        return {notFounded:true}
    }

    async remove(token) {
        const form = await Form.findOne({where:{token}})
        form.status = 0
        await form.save()
        return form
    }

}


module.exports = new FormService()