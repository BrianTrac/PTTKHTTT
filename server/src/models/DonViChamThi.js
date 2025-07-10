const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DonViChamThi = sequelize.define(
	"DonViChamThi",
	{
		MaDonViChamThi: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		TenDonViChamThi: {
			type: DataTypes.STRING(200),
			allowNull: false,
		},
		ThongTinLienLac: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
	},
	{
		tableName: "DonViChamThi",
		timestamps: false,
	}
);

module.exports = DonViChamThi;
