const YeuCauGiaHan = require("../models/YeuCauGiaHan");

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
};

module.exports = yeuCauGiaHanService;
