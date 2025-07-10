const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DanhSachCho = sequelize.define(
	"DanhSachCho",
	{
		MaDanhSachCho: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		NgayGiaHan: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		SoLuong: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
	},
	{
		tableName: "DanhSachCho",
		timestamps: false,
	}
);

module.exports = DanhSachCho;
