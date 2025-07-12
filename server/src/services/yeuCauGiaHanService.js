const YeuCauGiaHan = require("../models/YeuCauGiaHan");
const PhieuDuThi = require("../models/PhieuDuThi");
const PhieuDangKy = require("../models/PhieuDangKy");
const LichThi = require("../models/LichThi");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const { rejectYeuCauGiaHan } = require("../controllers/yeuCauGiaHanController");

const thayDoiLichThi = async (MaPhieuDuThi, ngayThi) => {
	const phieuDuthi = await PhieuDuThi.findOne({ where: { MaPhieuDuThi } });
	if (!phieuDuthi) {
		return {
			success: false,
			message: "Không tìm thấy phiếu dự thi",
		};
	}

	const maPhieuDangKy = phieuDuthi.MaPhieuDangKy;
	const phieuDangKy = await PhieuDangKy.findOne({
		where: { MaPhieuDangKy: maPhieuDangKy },
	});
	if (!phieuDangKy) {
		return {
			success: false,
			message: "Không tìm thấy phiếu đăng ký",
		};
	}

	const lichThi = await LichThi.findOne({
		where: {
			ThoiGianThi: {
				[Op.gte]: sequelize.literal(`'${ngayThi}T00:00:00.000Z'`),
			},
		},
		order: [["ThoiGianThi", "ASC"]],
	});

	if (!lichThi) {
		return {
			success: false,
			message: "Không tìm thấy lịch thi phù hợp với ngày đã chọn",
		};
	}

	await phieuDangKy.update({ MaLichThi: lichThi.MaLichThi });

	return {
		success: true,
		message: "Thay đổi lịch thi thành công",
	};
};

const yeuCauGiaHanService = {
	getYeuCauGiaHanById: async (id) => {
		try {
			const result = await YeuCauGiaHan.findOne({
				where: { MaYeuCau: id },
				attributes: [
					"MaYeuCau",
					"PhiGiaHan",
					"SoLanDaGiaHan",
					"NgayYeuCau",
					"LyDo",
					"BangChung",
					"MaPhieuDuThi",
					"TrangThai",
				],
			});

			if (!result) {
				return {
					success: false,
					message: "Không tìm thấy yêu cầu gia hạn",
				};
			}

			return {
				success: true,
				data: result,
			};
		} catch (error) {
			return {
				success: false,
				message: "Lỗi server khi lấy yêu cầu gia hạn",
				error: error.message,
			};
		}
	},

	confirmYeuCauGiaHan: async (MaYeuCau) => {
		try {
			// Find the request by MaYeuCau and MaPhieuDuThi
			const ycgh = await YeuCauGiaHan.findOne({
				where: { MaYeuCau },
			});

			if (!ycgh) {
				return {
					success: false,
					message: "Không tìm thấy yêu cầu gia hạn phù hợp",
				};
			}

			// Update SoLanDaGiaHan and TrangThai
			// Check if SoLanGiaHan >= 3 do not accept YCGH

			if (ycgh.SoLanDaGiaHan >= 3) {
				ycgh.TrangThai = "Tu_choi";
				await ycgh.save();

				return {
					success: false,
					message: "Yêu cầu gia hạn đã đạt giới hạn tối đa",
				};
			}

			const result = await thayDoiLichThi(ycgh.MaPhieuDuThi, ycgh.NgayYeuCau);

			if (!result.success) {
				return result;
			}

			ycgh.SoLanDaGiaHan = (ycgh.SoLanDaGiaHan || 0) + 1;
			ycgh.TrangThai = "Da_duyet";
			await ycgh.save();

			return {
				success: true,
				message: "Xác nhận yêu cầu gia hạn thành công",
				data: {
					MaYeuCau: ycgh.MaYeuCau,
					MaPhieuDuThi: ycgh.MaPhieuDuThi,
					SoLanDaGiaHan: ycgh.SoLanDaGiaHan,
					TrangThai: ycgh.TrangThai,
				},
			};
		} catch (error) {
			return {
				success: false,
				message: "Lỗi server khi xác nhận yêu cầu gia hạn",
				error: error.message,
			};
		}
	},

	rejectYeuCauGiaHan: async (MaYeuCau) => {
		try {
			// Find the request by MaYeuCau and MaPhieuDuThi
			const ycgh = await YeuCauGiaHan.findOne({
				where: { MaYeuCau },
			});

			if (!ycgh) {
				return {
					success: false,
					message: "Không tìm thấy yêu cầu gia hạn phù hợp",
				};
			}

			ycgh.TrangThai = "Tu_choi";
			await ycgh.save();

			return {
				success: true,
				message: "Từ chối yêu cầu gia hạn thành công",
				data: {
					MaYeuCau: ycgh.MaYeuCau,
					MaPhieuDuThi: ycgh.MaPhieuDuThi,
					SoLanDaGiaHan: ycgh.SoLanDaGiaHan,
					TrangThai: ycgh.TrangThai,
				},
			};
		} catch (error) {
			return {
				success: false,
				message: "Lỗi server khi từ chối yêu cầu gia hạn",
				error: error.message,
			};
		}
	},
};

module.exports = yeuCauGiaHanService;
