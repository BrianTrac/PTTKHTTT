const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const KhachHang = sequelize.define(
	"KhachHang",
	{
		MaKhachHang: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		Ten: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		Email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			validate: {
				isEmail: true,
			},
		},
		DiaChi: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		SDT: {
			type: DataTypes.STRING(15),
			allowNull: true,
		},
		NgaySinh: {
			type: DataTypes.DATEONLY,
			allowNull: true,
		},
		CCCD: {
			type: DataTypes.STRING(12),
			allowNull: true,
		},
		LoaiKhachHang: {
			type: DataTypes.STRING(10),
			allowNull: false,
			validate: {
				isIn: {
					args: [["Tu_Do", "Don_Vi"]],
				},
			},
		},
	},
	{
		tableName: "KhachHang",
		timestamps: false,
		indexes: [
			{
				unique: true,
				fields: ["Email"],
			},
			{
				unique: true,
				fields: ["CCCD"],
			},
		],
	}
);

module.exports = KhachHang;
