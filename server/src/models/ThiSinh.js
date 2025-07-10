const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ThiSinh = sequelize.define(
	"ThiSinh",
	{
		MaThiSinh: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		Ten: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		NgaySinh: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		CCCD: {
			type: DataTypes.STRING(12),
			allowNull: false,
			unique: true,
		},
		Email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			validate: {
				isEmail: true,
			},
		},
		MaKhachHang: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "KhachHang",
				key: "MaKhachHang",
			},
		},
		MaPhieuDangKy: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true,
			references: {
				model: "PhieuDangKy",
				key: "MaPhieuDangKy",
			},
		},
	},
	{
		tableName: "ThiSinh",
		timestamps: false,
	}
);

module.exports = ThiSinh;
