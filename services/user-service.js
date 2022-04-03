const {User} = require('../db/index.js')
const mailService = require('./mail-service')

const bcrypt = require('bcryptjs')
const config = require('config')

const UserDto = require('../dto/user-dto')
const tokenService = require('../services/token-service')
const ApiError = require('../exception/api-errors')
const { isJson, validateActive } = require('../functions/index.js')
const { emitter } = require('../controllers/events-controller.js')
const state = require('../state/index.js')
const telegramService = require('./telegram-service.js')

class UserService {
    async registration(body) {
        let {phone, password, email} = body
		const code = Math.floor(Math.random()*90000) + 10000;
		const candidate = await User.findOne({where:{phone}})
		if(candidate) {
            if(+candidate.code === 0)
                throw ApiError.BadRequest("Такой пользователь уже существует")
            
            await candidate.destroy()
        }
		password = await bcrypt.hash(password, 12)
        await mailService.sendCodeMail(email, code)
        const user = await User.create({...body, password, code})
        return user.dataValues.id
    }
 
    async activate({code, id}) {
        const user = await User.findOne({where:{id}})
        const admins = await User.findAll({where:{status:config.get("r-admin")}})
        if(code !== user.dataValues.code) {
            throw ApiError.BadRequest("Неверный код")
        }
        user.code = 0 
        await user.save()
        
        admins.forEach(async item => {
            emitter.emit('message', {state:state.user, id:item.id})
            await telegramService.sendCodeTelegram(item.telegram_id, "Новый пользователь")
        })

        return await UserService.responseToken(user)
    }
    
    async login({phone, password}) {
        const user = await User.findOne({where:{phone}})
        if(!user) {
            throw ApiError.BadRequest("Пользователь не найден")
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            throw ApiError.BadRequest("Неверный пароль ")
        }
        if(+user.code !== 0) {
            throw ApiError.Confirm()
        }
        // if(user.status) {
		// 	if(!isJson(user.status)) {
		// 		return await UserService.responseToken(user)
		// 	} else {
        //         if(Date.now() - +JSON.parse(user.status).date < 0) {
        //             return await UserService.responseToken(user)
        //         }
        //     }
		// }
        if(validateActive(user.status)) {
            return await UserService.responseToken(user)
        }
        throw ApiError.Expired()
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDb) 
            throw ApiError.UnauthorizedError()
        
        const user = await User.findOne({where:{id: userData.id}})
        return await UserService.responseToken(user)
    }

    async update(id,  body) {
        if(Object.keys(body).indexOf('status') !== -1) {
            throw ApiError.UnauthorizedError()
        }
        await User.update(
            {...body},
            {returning: true, where: {id} }
        )
        const user = await User.findOne({where:{id}})
        
        return await UserService.responseToken(user)
    }

    async updateByAdmin(id, body) {
        return await User.update(
            {...body},
            {returning: true, where: {id} }
        )
    }

    async getUser(id, a = false) {
        const user = await User.findOne({where:{id}})
        if(a) {
            return user
        }
        user.phone = null
        user.email = null
        const userDto = new UserDto(user)
        return {...userDto}
    }

    async isHaveTelegram(telegram_id) {
        return await User.findOne({where:{telegram_id}})
    }

    async getUsers() {
        return await User.findAll({where:{code:'0'}})
    }

    static async responseToken(user) {
        const userDto = new UserDto(user) // id phone email status 
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user:{...userDto}}
    }


}


module.exports = new UserService()