const lichThiService = require("../services/lichThiService");

const lichThiController = {
  getAllLichThi: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await lichThiService.getAllLichThi(page, limit);

      res.status(result.success ? 200 : 500).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Lỗi server khi lấy danh sách lịch thi",
        error: error.message,
      });
    }
  },
};

module.exports = lichThiController;
