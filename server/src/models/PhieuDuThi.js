const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PhieuDuThi = sequelize.define(
	"PhieuDuThi",
	{
		MaPhieuDuThi: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		SoBaoDanh: {
			type: DataTypes.STRING(20),
			allowNull: false,
			unique: true,
		},
		NgayPhatHanh: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		TrangThai: {
			type: DataTypes.ENUM("Cho_thi", "Da_thi", "Khong_hop_le"),
			defaultValue: "Cho_thi",
		},
		MaPhieuDangKy: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "PhieuDangKy",
				key: "MaPhieuDangKy",
			},
		},
		MaThiSinh: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "ThiSinh",
				key: "MaThiSinh",
			},
		},
	},
	{
		tableName: "PhieuDuThi",
		timestamps: false,
	}
);

module.exports = PhieuDuThi;
