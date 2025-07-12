const LichThi = require("../models/LichThi");

const lichThiService = {
  getAllLichThi: async (page = 1, limit = 10) => {
    try {
      const offset = (page - 1) * limit;
      const { count, rows } = await LichThi.findAndCountAll({
        limit,
        offset,
        order: [["ThoiGianThi", "ASC"]],
      });

      return {
        success: true,
        data: rows,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: "Lỗi server khi lấy danh sách lịch thi",
        error: error.message,
      };
    }
  },
};

module.exports = lichThiService;
