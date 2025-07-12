const phieuDangKyService = require("../services/phieuDangKyService");

const phieuDangKyController = {
  getAllPhieuDangKy: async (req, res) => {
    try {
      // Extract pagination parameters from query string
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      // Validate pagination parameters
      if (page < 1 || limit < 1) {
        return res.status(400).json({
          success: false,
          message: "Page và limit phải là số nguyên dương",
        });
      }

      // Call service to handle business logic
      const result = await phieuDangKyService.getAllPhieuDangKy(page, limit);

      // Determine status code based on result
      const statusCode = result.success ? 200 : 500;

      res.status(statusCode).json(result);
    } catch (error) {
      console.error("Error in phieuDangKyController.getAllPhieuDangKy:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi server khi lấy danh sách phiếu đăng ký",
        error: error.message,
      });
    }
  },

  getPhieuDangKyByMaThiSinhId: async (req, res) => {
    try {
      const { id } = req.params;

      // Extract pagination parameters from query string
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      // Validate pagination parameters
      if (page < 1 || limit < 1) {
        return res.status(400).json({
          success: false,
          message: "Page và limit phải là số nguyên dương",
        });
      }

      // Call service to handle business logic
      const result = await phieuDangKyService.getPhieuDangKyByMaThiSinhId(
        id,
        page,
        limit
      );

      // Determine status code based on result
      let statusCode = 200;
      if (!result.success) {
        if (result.message === "Mã thí sinh không hợp lệ") {
          statusCode = 400;
        } else if (
          result.message === "Không tìm thấy phiếu đăng ký cho thí sinh này"
        ) {
          statusCode = 404;
        } else {
          statusCode = 500;
        }
      }

      res.status(statusCode).json(result);
    } catch (error) {
      console.error(
        "Error in phieuDangKyController.getPhieuDangKyByMaThiSinhId:",
        error
      );
      res.status(500).json({
        success: false,
        message: "Lỗi server khi lấy thông tin phiếu đăng ký",
        error: error.message,
      });
    }
  },
};

module.exports = phieuDangKyController;
