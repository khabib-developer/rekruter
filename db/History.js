const Sequelize = require('sequelize')

module.exports = function (sequelize) {
	return sequelize.define('history', {
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
		start: {
			type: Sequelize.STRING,
			allowNull: false
		},
		stop: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, {
		timestamps:false,
		tableName:'history'
	})
}