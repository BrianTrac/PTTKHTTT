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
			unique: true,
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
			unique: true,
		},
		LoaiKhachHang: {
			type: DataTypes.ENUM("Tu_Do", "Don_Vi"),
			defaultValue: "Tu_Do",
		},
	},
	{
		tableName: "KhachHang",
		timestamps: false,
	}
);

module.exports = KhachHang;
