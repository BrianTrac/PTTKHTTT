const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const HoaDon = sequelize.define(
	"HoaDon",
	{
		MaHoaDon: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		SoTien: {
			type: DataTypes.DECIMAL(15, 2),
			allowNull: false,
			validate: {
				min: 0,
			},
		},
		MucGiamGia: {
			type: DataTypes.DECIMAL(5, 2),
			validate: {
				min: 0,
				max: 100,
			},
		},
		HinhThucThanhToan: {
			type: DataTypes.STRING(20),
			allowNull: false,
			validate: {
				isIn: {
					args: [["Tien_mat", "Chuyen_khoan", "The_tin_dung"]],
				},
			},
		},
		NgayThanhToan: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		MaThanhToan: {
			type: DataTypes.STRING(50),
			allowNull: true,
		},
		TrangThai: {
			type: DataTypes.STRING(20),
			validate: {
				isIn: {
					args: [["Chua_thanh_toan", "Da_thanh_toan", "Huy"]],
				},
			},
		},
		GiaHan: {
			type: DataTypes.BOOLEAN,
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
		tableName: "HoaDon",
		timestamps: false,
	}
);

module.exports = HoaDon;
