const fs = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(fs.readFile)

const ApiError = require('../exception/api-errors');

const path = require('path');

class FileService {


    async delete(folder, name) {
        try {
            const file = path.join(path.dirname(__dirname),`/static/${folder}/`)+name
            const res = await readFileAsync(file)
            
            if(res) {
                fs.unlink( file , function(err) {
                    if(err) {
                        throw ApiError.BadRequest(err.message)
                    };
                    // console.log('file deleted successfully');
                })
            }
            
        } catch (error) {
            console.log(error)
        }
        
    }

    async removeToken(refreshToken) {
        const token = await Token.findOne({where:{refreshToken}})
        await token.destroy()
        return token
    }
}


module.exports = new FileService()