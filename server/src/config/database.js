const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
	process.env.DB_NAME || "examination_management",
	process.env.DB_USER || "sa",
	process.env.DB_PASSWORD || "Password123!",
	{
		host: process.env.DB_HOST || "localhost",
		port: process.env.DB_PORT || 1433,
		dialect: "mssql",
		dialectOptions: {
			encrypt: true,
			trustServerCertificate: true,
		},
		logging: process.env.NODE_ENV === "development" ? console.log : false,
		pool: {
			max: 10,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	}
);

module.exports = sequelize;
