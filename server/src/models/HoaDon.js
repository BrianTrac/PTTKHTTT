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
			defaultValue: 0,
			validate: {
				min: 0,
				max: 100,
			},
		},
		HinhThucThanhToan: {
			type: DataTypes.ENUM("Tien_mat", "Chuyen_khoan", "The_tin_dung"),
			allowNull: false,
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
			type: DataTypes.ENUM("Chua_thanh_toan", "Da_thanh_toan", "Huy"),
			defaultValue: "Chua_thanh_toan",
		},
		GiaHan: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
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
