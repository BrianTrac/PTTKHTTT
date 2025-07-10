const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const LichThi_NhanVienCoiThi = sequelize.define(
	"LichThi_NhanVienCoiThi",
	{
		MaLichThi: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			references: {
				model: "LichThi",
				key: "MaLichThi",
			},
		},
		MaNhanVienCoiThi: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			references: {
				model: "NhanVien",
				key: "MaNhanVien",
			},
		},
	},
	{
		tableName: "LichThi_NhanVienCoiThi",
		timestamps: false,
	}
);

module.exports = LichThi_NhanVienCoiThi;
