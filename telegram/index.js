const {Telegraf, Markup, Extra, Telegram} = require('telegraf')
const config = require('config')
const userService = require('../services/user-service')
const { emitter } = require('../controllers/events-controller')
const state = require('../state')

const bot = new Telegraf(config.get('token'))


bot.start(async ctx => {
    try {
        const id = ctx.startPayload
        const telegram_id = ctx.from.id
        if(id) {
            const user = await userService.getUser(id)
            if(user.telegram_id) {
                return  await ctx.reply("Вы уже зарегистрированы")
            } else if(user.telegram_id === 'notNeed') 
                return
            
            if(user && !user.telegram_id ) {
                const data = {
                    username: `@${ctx.from.username}`,
                    first_name: ctx.from.first_name,
                    id,
                    telegram_id:ctx.from.id,
                    state: state.telegram
                }
                await ctx.reply("Вы успешно зарегистрировались")
                emitter.emit('message', data)
                return
            }

            return await ctx.reply("Вы начали не с той ссылки")
        }

        const isHaveTelegram = await userService.isHaveTelegram(telegram_id)

        if(isHaveTelegram) {
            return  await ctx.reply("Вы уже зарегистрированы")
        }

        await ctx.reply('Начните с реферальной ссылки')
        
    } catch (error) {
        console.log(error)
        await ctx.reply("Вы начали не с той ссылки")
    }
    
})

bot.on('message', ctx => {
    console.log(2)
})

module.exports = {bot}