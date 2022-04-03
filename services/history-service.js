const {History} = require('../db/index.js')
const ApiError = require('../exception/api-errors.js')

class HistoryService {
    async check(user_id, date) {
        const items = await History.findAll({where:{user_id}})

        return items.find(e => Number(e.stop)-120000 > date )
    }

    async create(user_id, start, stop) {
        const check = await this.check(user_id, Date.now())
        if(!check) {
            return await History.create({user_id, start, stop})
        }
        throw ApiError.BadRequest("У этого пользователя есть доступ")
    }   

    async update(user_id, stop) {
        const item = await this.check(user_id, Date.now())
        if(!item) {
            throw ApiError.BadRequest("Что то пошло не так ")
        }
        const history = await History.findOne({where:{id:item.id}})
        history.stop = stop
        await history.save()

    }

    async get(user_id) { 
        return await History.findAll({where:{user_id}})
    }

   

}


module.exports = new HistoryService()