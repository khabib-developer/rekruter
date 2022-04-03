const Sequelize = require('sequelize')

module.exports = function (sequelize) {
	return sequelize.define('users', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		phone: {
			type: Sequelize.STRING,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		},
		telegram_id: {
			type: Sequelize.STRING,
			allowNull: true
		},
		type:{
			type: Sequelize.INTEGER,
			allowNull: false
		},
		resume: {
			type: Sequelize.STRING,
			allowNull: true
		},
		photo: {
			type: Sequelize.STRING,
			allowNull: true
		},
		video: {
			type: Sequelize.STRING,
			allowNull: true
		},
		location: {
			type: Sequelize.STRING,
			allowNull: true
		},
		code: {
			type: Sequelize.STRING,
			allowNull: true
		},
		status: {
			type: Sequelize.STRING,
			allowNull: true
		},
	}, {
		timestamps:false,
		tableName:'users'
	})
}