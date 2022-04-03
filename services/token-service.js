const config = require('config')
const jwt = require('jsonwebtoken')
const {Token} = require('../db/index.js')

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload,config.get('jwtSecret'), {expiresIn:"6h"})
        const refreshToken = jwt.sign(payload,config.get('jwtSecretRefresh'), {expiresIn:"7d"})
        return {accessToken,refreshToken}
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, config.get('jwtSecret'))
        } catch (error) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, config.get('jwtSecretRefresh'))
        } catch (error) {
            return null
        }
    }
    
    async saveToken (user_id, refreshToken) {
        const candidate = await Token.findOne({where:{user_id}})
        if(candidate) {
            await Token.update(
				{refreshToken},
				{returning: true, where: {user_id} }
			)
            return refreshToken
        }
        await Token.create({user_id,refreshToken})
        return refreshToken
    }

    async removeToken(refreshToken) {
        const token = await Token.findOne({where:{refreshToken}})
        await token.destroy()
        return token
    }

    async findToken(refreshToken) {
        return await Token.findOne({where:{refreshToken}})
    }
}


module.exports = new TokenService()