const Sequelize = require('sequelize')

module.exports = function (sequelize) {
	return sequelize.define('form', {
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
		token: {
			type: Sequelize.STRING,
			allowNull: false
		},
		title: {
			type: Sequelize.STRING,
			allowNull: false
		},
		jobs: {
			type: Sequelize.JSON,
			allowNull: false
		},
		structure: {
			type: Sequelize.JSON,
			allowNull: false
		},
        date: {
			type: Sequelize.STRING,
			allowNull: false
		},
        status: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
	}, {
		timestamps:false,
		tableName:'form'
	})
}