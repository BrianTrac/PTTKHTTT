const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PhongThi = sequelize.define(
	"PhongThi",
	{
		MaPhong: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		TenPhong: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		SucChua: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: 1,
			},
		},
		DiaDiem: {
			type: DataTypes.STRING(200),
			allowNull: false,
		},
		MaLichThi: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: "LichThi",
				key: "MaLichThi",
			},
		},
	},
	{
		tableName: "PhongThi",
		timestamps: false,
	}
);

module.exports = PhongThi;
