const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const YeuCauGiaHan = sequelize.define(
	"YeuCauGiaHan",
	{
		MaYeuCau: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		LyDo: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		BangChung: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		PhiGiaHan: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
			validate: {
				min: 0,
			},
		},
		SoLanDaGiaHan: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			validate: {
				min: 0,
			},
		},
		NgayYeuCau: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		TrangThai: {
			type: DataTypes.ENUM("Cho_duyet", "Da_duyet", "Tu_choi"),
			defaultValue: "Cho_duyet",
		},
		MaPhieuDuThi: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "PhieuDuThi",
				key: "MaPhieuDuThi",
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
		MaDanhSachCho: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: "DanhSachCho",
				key: "MaDanhSachCho",
			},
		},
	},
	{
		tableName: "YeuCauGiaHan",
		timestamps: false,
	}
);

module.exports = YeuCauGiaHan;
