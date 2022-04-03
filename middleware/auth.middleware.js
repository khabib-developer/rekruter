const jwt = require('jsonwebtoken')
const config = require('config')
const ApiError = require('../exception/api-errors')
const tokenService = require('../services/token-service')
const { isJson, validateActive } = require('../functions')


module.exports = (req, res, next) => {
	// if(req.method === 'OPTIONS') {
	// 	return next()
	// }
	try {
		const authorization = req.headers.authorization
		if(!authorization)
			return next(ApiError.UnauthorizedError())

		const accessToken = authorization.split(' ')[1]
		if(!accessToken)
			return next(ApiError.UnauthorizedError())
		const userData = tokenService.validateAccessToken(accessToken)

		if(!userData)
			return next(ApiError.UnauthorizedError())
		

		req.user = userData

		if(validateActive(userData.status)) {
			next()
		} else {
			next(next(ApiError.Expired()))
		}
		
	} catch(e) {
		return next(ApiError.UnauthorizedError())
	}
}