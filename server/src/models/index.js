const sequelize = require("../config/database");

const KhachHang = require("./KhachHang");
const NhanVien = require("./NhanVien");
const DonViChamThi = require("./DonViChamThi");
const DanhSachCho = require("./DanhSachCho");
const LichThi = require("./LichThi");
const PhongThi = require("./PhongThi");
const PhieuDangKy = require("./PhieuDangKy");
const ThiSinh = require("./ThiSinh");
const HoaDon = require("./HoaDon");
const PhieuDuThi = require("./PhieuDuThi");
const KetQuaThi = require("./KetQuaThi");
const ChungChi = require("./ChungChi");
const YeuCauGiaHan = require("./YeuCauGiaHan");
const LichThi_NhanVienCoiThi = require("./LichThi_NhanVienCoiThi");

const defineAssociations = () => {
	KhachHang.hasMany(PhieuDangKy, {
		foreignKey: "MaKhachHang",
		as: "PhieuDangKy",
	});
	KhachHang.hasMany(ThiSinh, { foreignKey: "MaKhachHang", as: "ThiSinh" });

	NhanVien.hasMany(PhieuDangKy, {
		foreignKey: "MaNhanVien",
		as: "PhieuDangKy",
	});
	NhanVien.hasMany(YeuCauGiaHan, {
		foreignKey: "MaNhanVien",
		as: "YeuCauGiaHan",
	});

	LichThi.hasMany(PhongThi, { foreignKey: "MaLichThi", as: "PhongThi" });
	LichThi.hasMany(PhieuDangKy, { foreignKey: "MaLichThi", as: "PhieuDangKy" });

	LichThi.belongsToMany(NhanVien, {
		through: LichThi_NhanVienCoiThi,
		foreignKey: "MaLichThi",
		otherKey: "MaNhanVienCoiThi",
		as: "NhanVienCoiThi",
	});

	NhanVien.belongsToMany(LichThi, {
		through: LichThi_NhanVienCoiThi,
		foreignKey: "MaNhanVienCoiThi",
		otherKey: "MaLichThi",
		as: "LichThiCoiThi",
	});

	PhongThi.belongsTo(LichThi, { foreignKey: "MaLichThi", as: "LichThi" });

	PhieuDangKy.belongsTo(KhachHang, {
		foreignKey: "MaKhachHang",
		as: "KhachHang",
	});
	PhieuDangKy.belongsTo(LichThi, { foreignKey: "MaLichThi", as: "LichThi" });
	PhieuDangKy.belongsTo(NhanVien, { foreignKey: "MaNhanVien", as: "NhanVien" });
	PhieuDangKy.hasOne(ThiSinh, { foreignKey: "MaPhieuDangKy", as: "ThiSinh" });
	PhieuDangKy.hasMany(HoaDon, { foreignKey: "MaPhieuDangKy", as: "HoaDon" });
	PhieuDangKy.hasMany(PhieuDuThi, {
		foreignKey: "MaPhieuDangKy",
		as: "PhieuDuThi",
	});

	ThiSinh.belongsTo(KhachHang, { foreignKey: "MaKhachHang", as: "KhachHang" });
	ThiSinh.belongsTo(PhieuDangKy, {
		foreignKey: "MaPhieuDangKy",
		as: "PhieuDangKy",
	});
	ThiSinh.hasMany(PhieuDuThi, { foreignKey: "MaThiSinh", as: "PhieuDuThi" });

	HoaDon.belongsTo(PhieuDangKy, {
		foreignKey: "MaPhieuDangKy",
		as: "PhieuDangKy",
	});

	PhieuDuThi.belongsTo(PhieuDangKy, {
		foreignKey: "MaPhieuDangKy",
		as: "PhieuDangKy",
	});
	PhieuDuThi.belongsTo(ThiSinh, { foreignKey: "MaThiSinh", as: "ThiSinh" });
	PhieuDuThi.hasMany(KetQuaThi, {
		foreignKey: "MaPhieuDuThi",
		as: "KetQuaThi",
	});
	PhieuDuThi.hasMany(YeuCauGiaHan, {
		foreignKey: "MaPhieuDuThi",
		as: "YeuCauGiaHan",
	});

	KetQuaThi.belongsTo(PhieuDuThi, {
		foreignKey: "MaPhieuDuThi",
		as: "PhieuDuThi",
	});
	KetQuaThi.belongsTo(DonViChamThi, {
		foreignKey: "MaDonViChamThi",
		as: "DonViChamThi",
	});
	KetQuaThi.hasMany(ChungChi, { foreignKey: "MaKetQua", as: "ChungChi" });

	ChungChi.belongsTo(KetQuaThi, { foreignKey: "MaKetQua", as: "KetQuaThi" });

	DonViChamThi.hasMany(KetQuaThi, {
		foreignKey: "MaDonViChamThi",
		as: "KetQuaThi",
	});

	YeuCauGiaHan.belongsTo(PhieuDuThi, {
		foreignKey: "MaPhieuDuThi",
		as: "PhieuDuThi",
	});
	YeuCauGiaHan.belongsTo(NhanVien, {
		foreignKey: "MaNhanVien",
		as: "NhanVien",
	});
	YeuCauGiaHan.belongsTo(DanhSachCho, {
		foreignKey: "MaDanhSachCho",
		as: "DanhSachCho",
	});

	DanhSachCho.hasMany(YeuCauGiaHan, {
		foreignKey: "MaDanhSachCho",
		as: "YeuCauGiaHan",
	});
};

defineAssociations();

module.exports = {
	sequelize,
	KhachHang,
	NhanVien,
	DonViChamThi,
	DanhSachCho,
	LichThi,
	PhongThi,
	PhieuDangKy,
	ThiSinh,
	HoaDon,
	PhieuDuThi,
	KetQuaThi,
	ChungChi,
	YeuCauGiaHan,
	LichThi_NhanVienCoiThi,
};
