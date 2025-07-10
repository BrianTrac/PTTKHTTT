const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PhieuDangKy = sequelize.define(
	"PhieuDangKy",
	{
		MaPhieuDangKy: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		LoaiKiThi: {
			type: DataTypes.ENUM("TOEIC", "IELTS", "SAT", "GRE", "GMAT"),
			allowNull: false,
		},
		NgayDangKy: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		TrangThai: {
			type: DataTypes.ENUM("Cho_duyet", "Da_duyet", "Tu_choi", "Hoan_thanh"),
			defaultValue: "Cho_duyet",
		},
		MaKhachHang: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "KhachHang",
				key: "MaKhachHang",
			},
		},
		MaLichThi: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "LichThi",
				key: "MaLichThi",
			},
		},
		MaNhanVien: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: "NhanVien",
				key: "MaNhanVien",
			},
		},
	},
	{
		tableName: "PhieuDangKy",
		timestamps: false,
	}
);

module.exports = PhieuDangKy;
