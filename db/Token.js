const Sequelize = require('sequelize')

module.exports = function (sequelize) {
	return sequelize.define('token', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		user_id: {
			type: Sequelize.INTEGER,
            required:true,
			allowNull: false
		},
		refreshToken: {
			type: Sequelize.STRING,
			allowNull: false
		}
		
	}, {
		timestamps:false,
		tableName:'token'
	})
}