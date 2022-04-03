const config = require('config')
const fetch = require('node-fetch')
const ApiError = require('../exception/api-errors')
class TelegramService {
    constructor() {
        this.url = `https://api.telegram.org/bot${config.get("token")}/sendMessage?chat_id=`
    }
    async sendCodeTelegram(id, message) {
        try {
            console.log('telegraaaaaaaaaaaaaam')
            const res = await fetch(`${this.url}${id}&text=${message}`)
            console.log(res)
        } catch (error) {
            console.log(error)
            // ApiError.BadRequest(error.message)
        }
        
    }
    
}

module.exports = new TelegramService()