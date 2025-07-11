const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const NhanVien = sequelize.define(
	"NhanVien",
	{
		MaNhanVien: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		VaiTro: {
			type: DataTypes.STRING(25),
			allowNull: false,
			validate: {
				isIn: {
					args: [
						[
							"Quan_ly",
							"Nhan_vien_tiep_nhan",
							"Nhan_vien_cham_thi",
							"Nhan_vien_coi_thi",
						],
					],
				},
			},
		},
		HoTen: {
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
		SDT: {
			type: DataTypes.STRING(15),
			allowNull: true,
		},
	},
	{
		tableName: "NhanVien",
		timestamps: false,
		indexes: [
			{
				unique: true,
				fields: ["Email"],
			},
		],
	}
);

module.exports = NhanVien;
