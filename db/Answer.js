const Sequelize = require('sequelize')

module.exports = function (sequelize) {
	return sequelize.define('answer', {
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
        name_of_form: {
			type: Sequelize.STRING,
			allowNull: false
		},
		token: {
			type: Sequelize.STRING,
			allowNull: false
		},
		data: {
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
        state: {
			type: Sequelize.STRING,
			allowNull: true
		}
	}, {
		timestamps:false,
		tableName:'answer'
	})
}