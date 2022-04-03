"use strict"
const userService = require('../services/user-service')
const events = require('events')

events.EventEmitter.prototype._maxListeners = 0

const emitter = new events.EventEmitter()


class EventController {

    async connect(req, res, next) {

        try {
            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
            })

            res.write('')
            
            console.log('connected')

            emitter.on('message', (data) => {
                console.log(data)
                res.write(`data: ${JSON.stringify(data)}\n\n`)
            } )
            
        } catch (error) {
            console.log(error)
        }
        
    }
}


module.exports = {eventsController:new EventController(),emitter}