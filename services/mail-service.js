const config = require('config')
const nodemailer = require('nodemailer')
class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host:config.get('smtpHost'),
            port:config.get('smtpPort'),
            secure:false,
            auth: {
                user: config.get('smtpUser'),
                pass: 'qqjyyjwjnliqerma'
                // pass: 'knjqbxooocuxqhix'
            }
        })
    }
    async sendCodeMail(to, code) {
        console.log(2, to, config.get('smtpUser'))
        await this.transporter.sendMail( {
            from: config.get('smtpUser'),to,
            subject:"Aktivatsiya akkaunta",
            text: 'Kod: '+code
        })
        console.log(3)
    }
    
}
 

module.exports = new MailService()