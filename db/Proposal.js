const Sequelize = require('sequelize')

module.exports = function (sequelize) {
	return sequelize.define('proposal', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		user_id: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		vacancy_id: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		date: {
			type: Sequelize.STRING,
			allowNull: false
		},
        text: {
			type: Sequelize.STRING,
			allowNull: true
		},
		status: {
			type: Sequelize.STRING,
			allowNull: true
		},
		state: {
			type: Sequelize.STRING,
			allowNull: true
		}
		
	}, {
		timestamps:false,
		tableName:'proposal'
	})
}