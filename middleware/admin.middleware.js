const ApiError = require('../exception/api-errors')
const config = require('config')
const userService = require('../services/user-service')


module.exports = async (req, res, next) => {
	try {
		const {id} = req.user
        const user = await userService.getUser(id, true)
        if(user.status === config.get("r-admin"))
            return next()
        next(ApiError.Locked())
	} catch(e) {
		return next(ApiError.UnauthorizedError())
	}
}