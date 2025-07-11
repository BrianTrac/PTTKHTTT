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
			references: {
				model: "PhieuDangKy",
				key: "MaPhieuDangKy",
			},
		},
	},
	{
		tableName: "ThiSinh",
		timestamps: false,
		indexes: [
			{
				unique: true,
				fields: ["Email"],
			},
			{
				unique: true,
				fields: ["MaPhieuDangKy"],
			},
		],
	}
);

module.exports = ThiSinh;
