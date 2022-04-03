const Sequelize = require('sequelize')

module.exports = function (sequelize) {
	return sequelize.define('vacancy', {
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
		type: {
			type: Sequelize.STRING,
			allowNull: false
		},
		title: {
			type: Sequelize.STRING,
			allowNull: false
		},
		description: {
			type: Sequelize.STRING,
			allowNull: false
		},
		skills:{
			type: Sequelize.JSON,
			allowNull: true
		},
		salary: {
			type: Sequelize.JSON,
			allowNull: false
		},
		place: {
			type: Sequelize.STRING,
			allowNull: false
		},
		language: {
			type: Sequelize.JSON,
			allowNull: true
		},
        contact: {
			type: Sequelize.TINYINT,
			allowNull: true
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
		tableName:'vacancy'
	})
}