const hoaDonService = require("../services/hoaDonService");

const hoaDonController = {
  getHoaDonById: async (req, res) => {
    try {
      const { id } = req.params;

      // Call the service to handle the business logic
      const result = await hoaDonService.getHoaDonById(id);

      // Determine status code based on result
      let statusCode = 200;
      if (!result.success) {
        if (result.message === "Mã hóa đơn không hợp lệ") {
          statusCode = 400;
        } else if (result.message === "Không tìm thấy hóa đơn") {
          statusCode = 404;
        } else {
          statusCode = 500;
        }
      }

      res.status(statusCode).json(result);
    } catch (error) {
      console.error("Error in hoaDonController.getHoaDonById:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi server khi lấy thông tin hóa đơn",
        error: error.message,
      });
    }
  },

  sendInvoiceEmail: async (req, res) => {
    try {
      const { id } = req.params;
      const { HinhThucThanhToan } = req.query; // Get from query string

      // Call the service to handle the business logic
      const result = await hoaDonService.sendInvoiceEmail(
        id,
        HinhThucThanhToan
      );

      // Determine status code based on result
      let statusCode = 200;
      if (!result.success) {
        if (result.message === "Mã hóa đơn không hợp lệ") {
          statusCode = 400;
        } else if (result.message === "Không tìm thấy hóa đơn") {
          statusCode = 404;
        } else {
          statusCode = 500;
        }
      }

      res.status(statusCode).json(result);
    } catch (error) {
      console.error("Error in hoaDonController.sendInvoiceEmail:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi server khi gửi email hóa đơn",
        error: error.message,
      });
    }
  },
};

module.exports = hoaDonController;
