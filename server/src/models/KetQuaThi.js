const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const KetQuaThi = sequelize.define(
	"KetQuaThi",
	{
		MaKetQua: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		Diem: {
			type: DataTypes.DECIMAL(4, 2),
			allowNull: false,
			validate: {
				min: 0,
				max: 100,
			},
		},
		NgayCongBo: {
			type: DataTypes.DATEONLY,
			allowNull: true,
		},
		MaPhieuDuThi: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "PhieuDuThi",
				key: "MaPhieuDuThi",
			},
		},
		MaDonViChamThi: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "DonViChamThi",
				key: "MaDonViChamThi",
			},
		},
	},
	{
		tableName: "KetQuaThi",
		timestamps: false,
	}
);

module.exports = KetQuaThi;
