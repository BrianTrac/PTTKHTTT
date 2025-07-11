const {
	PhieuDangKy,
	KhachHang,
	LichThi,
	NhanVien,
	ThiSinh,
} = require("../models");

const phieuDangKyController = {
	getAllPhieuDangKy: async (req, res) => {
		try {
			const phieuDangKyList = await PhieuDangKy.findAll({
				include: [
					{
						model: KhachHang,
						as: "KhachHang",
						attributes: [
							"MaKhachHang",
							"Ten",
							"NgaySinh",
							"Email",
							"SDT",
							"LoaiKhachHang",
						],
					},
					{
						model: LichThi,
						as: "LichThi",
						attributes: ["MaLichThi", "TenLichThi", "ThoiGianThi"],
					},
					{
						model: NhanVien,
						as: "NhanVien",
						attributes: ["MaNhanVien", "HoTen", "VaiTro"],
						required: false,
					},
					{
						model: ThiSinh,
						as: "ThiSinh",
						attributes: ["MaThiSinh", "Ten", "CCCD", "NgaySinh"],
						required: false,
					},
				],
				order: [["NgayDangKy", "DESC"]],
			});

			res.status(200).json({
				success: true,
				message: "Lấy danh sách phiếu đăng ký thành công",
				data: phieuDangKyList,
				total: phieuDangKyList.length,
			});
		} catch (error) {
			console.error("Lỗi khi lấy danh sách phiếu đăng ký:", error);
			res.status(500).json({
				success: false,
				message: "Lỗi server khi lấy danh sách phiếu đăng ký",
				error: error.message,
			});
		}
	},
};

module.exports = phieuDangKyController;
