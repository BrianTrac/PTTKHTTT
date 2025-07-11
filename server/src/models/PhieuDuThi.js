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
		},
		NgayPhatHanh: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		TrangThai: {
			type: DataTypes.STRING(15),
			validate: {
				isIn: {
					args: [["Cho_thi", "Da_thi", "Khong_hop_le"]],
				},
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
		indexes: [
			{
				unique: true,
				fields: ["SoBaoDanh"],
			},
		],
	}
);

module.exports = PhieuDuThi;
