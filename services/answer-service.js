const config = require('config')
const jwt = require('jsonwebtoken')
const {Answer} = require('../db/index.js')
const fileService = require('./file-service.js')
const formService = require('./form-service.js')

class AnswerService {
    async create(token, data, name_of_form, user_id) {
        const date = Date.now()
        return await Answer.create({token, data, date, name_of_form, user_id})
    }

    async get(user_id) { 
        const res = await Answer.findAll({where:{user_id}})
        const forms = await formService.get(user_id)
        res.forEach((item, i ) => {
            const form = forms.find(e => e.token === item.token)
            if(form) {
                item.dataValues.structure = form.structure
            }
        })
        return res.map(e => e.dataValues)
    }

    async update(id, body) {
        await Answer.update(
            body,
            {returning: true, where: {id} }
        )
    }

    async remove(id) {
        const answer = await Answer.findOne({where:{id}})


        const form = await formService.getOne(answer.token)

        const arr = JSON.parse(form.structure).filter(e => e.type === 'file')

        const image = JSON.parse(answer.data).image.split("").reverse().join("")

        const array = [
            {
                folder: "images",
                name: image.slice(0, image.indexOf('/')).split("").reverse().join("")
            }
        ]

        arr.forEach((item, i) => {
            const index = Object.keys(JSON.parse(answer.data)).indexOf(item.text)
            
            if(index !== -1) {
                let name =  JSON.parse(answer.data)[Object.keys(JSON.parse(answer.data))[index]].split("").reverse().join("")
                array.push({
                    folder:item.file, 
                    name: name.slice(0, name.indexOf('/')).split("").reverse().join("")
                })
            }
        })

        array.forEach(item => {
            fileService.delete(item.folder, item.name)
        })


        await answer.destroy()
    }

}


module.exports = new AnswerService()