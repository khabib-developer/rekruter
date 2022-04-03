const {Vacancy, Proposal, User} = require('../db/index.js')

class VacancyService {
    async create(user_id, body) {
        return await Vacancy.create({...body, date:Date.now(), user_id})
    }
    async read(offset) {
        const data = await Vacancy.findAll({limit:10,offset})
        return data.map(e => e.dataValues)
    }

    async get(user_id) {
        return await Vacancy.findAll({where:{user_id}})
    }

    async isHaveProposal(user_id, vacancy_id) {
        return await Proposal.findOne({where:{user_id, vacancy_id}})
    }

    async createProposal(user_id, body) {
        return await Proposal.create({...body, user_id, date:Date.now()})
    }

    async getProposal(user_id, type) {
        const array = []
        let proposals = [] , users = []
        const user = await User.findOne({where:{id:user_id}})
        if(type === 0) {
            const vacancy_ids = await Vacancy.findAll({where:{user_id}})
            proposals = await Proposal.findAll({where:{vacancy_id:vacancy_ids.map(e => e.dataValues.id)}})
            users = await User.findAll({where:{id:proposals.map(e => e.dataValues.user_id)}})
        } else {
            proposals = await Proposal.findAll({where:{user_id:user.id}})
        }
        const vacancy = await Vacancy.findAll({where:{id:proposals.map(e => e.dataValues.vacancy_id)}})
        proposals.forEach((el, i) => {
            array.push({
                ...proposals[i].dataValues,
                vacancy: vacancy[i].dataValues,
                name: (users&&users.length!==0)?users.find(e => e.dataValues.id === proposals[i].dataValues.user_id).dataValues.name:''
            })
        });

        return array
    }

    async update(id, body) {
        return await Proposal.update(
            body,
            {returning: true, where: {id} }
        )
    }

    async remove(id) {
        const answer = await Proposal.findOne({where:{id}})
        await answer.destroy()
    }
}


module.exports = new VacancyService()