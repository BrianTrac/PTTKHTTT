const yeuCauGiaHanService = require("../services/yeuCauGiaHanService");

const yeuCauGiaHanController = {
	getYeuCauGiaHanById: async (req, res) => {
		try {
			const { id } = req.params;
			const result = await yeuCauGiaHanService.getYeuCauGiaHanById(id);

			let statusCode = result.success
				? 200
				: result.message === "Không tìm thấy yêu cầu gia hạn"
				? 404
				: 500;
			res.status(statusCode).json(result);
		} catch (error) {
			res.status(500).json({
				success: false,
				message: "Lỗi server khi lấy yêu cầu gia hạn",
				error: error.message,
			});
		}
	},

	confirmYeuCauGiaHan: async (req, res) => {
		try {
			const { MaYeuCau } = req.body;

			if (!MaYeuCau) {
				return res.status(400).json({
					success: false,
					message: "Thiếu MaYeuCau",
				});
			}

			const result = await yeuCauGiaHanService.confirmYeuCauGiaHan(MaYeuCau);

			let statusCode = result.success
				? 200
				: result.message.includes("Không tìm thấy")
				? 404
				: 500;
			res.status(statusCode).json(result);
		} catch (error) {
			res.status(500).json({
				success: false,
				message: "Lỗi server khi xác nhận yêu cầu gia hạn",
				error: error.message,
			});
		}
	},

	rejectYeuCauGiaHan: async (req, res) => {
		try {
			const { MaYeuCau } = req.body;

			if (!MaYeuCau) {
				return res.status(400).json({
					success: false,
					message: "Thiếu MaYeuCau",
				});
			}

			const result = await yeuCauGiaHanService.rejectYeuCauGiaHan(MaYeuCau);

			let statusCode = result.success
				? 200
				: result.message.includes("Không tìm thấy")
				? 404
				: 500;
			res.status(statusCode).json(result);
		} catch (error) {
			res.status(500).json({
				success: false,
				message: "Lỗi server khi xác nhận yêu cầu gia hạn",
				error: error.message,
			});
		}
	},
};

module.exports = yeuCauGiaHanController;
