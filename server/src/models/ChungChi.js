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
			type: DataTypes.STRING(10),
			allowNull: false,
			validate: {
				isIn: {
					args: [["TOEIC", "IELTS", "SAT", "GRE", "GMAT"]],
				},
			},
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
			type: DataTypes.STRING(15),
			validate: {
				isIn: {
					args: [["Da_cap", "Da_nhan", "Bi_thu_hoi"]],
				},
			},
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
