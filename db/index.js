const Sequelize = require('sequelize')
const config = require('config')


const sequelize = new Sequelize(config.get('name'), config.get('user'), config.get('password'), {
	dialect:"mysql",
	host:"localhost",
	socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
	port:'8889' 
})

const User = require('./User.js')(sequelize)
const Vacancy = require('./Vacancy.js')(sequelize)
const Proposal = require('./Proposal.js')(sequelize)
const Token = require('./Token.js')(sequelize)
const Form = require('./Form.js')(sequelize)
const Answer = require('./Answer.js')(sequelize)
const History = require('./History.js')(sequelize)

module.exports = { 
	sequelize,
	User,
	Vacancy,
	Proposal,
	Token,
	Form,
	Answer,
	History
}