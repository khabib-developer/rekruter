const puppeteer = require('puppeteer')
const path = require('path')
const userService = require('./user-service')

class ResumeService {
    async create(id, html) {
        const resume = id+"_"+Date.now()+".pdf"

        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        
        await page.setContent(html)
        await page.pdf({
            path:path.join(path.dirname(__dirname),'/static/resume/')+resume,
            format:"A4"
        })
        return await userService.update(id, {resume})
    }
 
}


module.exports = new ResumeService()