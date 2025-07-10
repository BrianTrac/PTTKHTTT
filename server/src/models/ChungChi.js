const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ChungChi = sequelize.define(
	"ChungChi",
	{
		MaChungChi: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		LoaiChungChi: {
			type: DataTypes.ENUM("TOEIC", "IELTS", "SAT", "GRE", "GMAT"),
			allowNull: false,
		},
		NgayCap: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		NgayNhan: {
			type: DataTypes.DATEONLY,
			allowNull: true,
		},
		TrangThai: {
			type: DataTypes.ENUM("Da_cap", "Da_nhan", "Bi_thu_hoi"),
			defaultValue: "Da_cap",
		},
		MaKetQua: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "KetQuaThi",
				key: "MaKetQua",
			},
		},
	},
	{
		tableName: "ChungChi",
		timestamps: false,
	}
);

module.exports = ChungChi;
