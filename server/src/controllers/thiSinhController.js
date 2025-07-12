const thiSinhService = require("../services/thiSinhService");

const thiSinhController = {
  getCertificateInfo: async (req, res) => {
    try {
      const { maThiSinh } = req.params;

      if (!maThiSinh) {
        return res.status(400).json({
          success: false,
          message: "Mã thí sinh là bắt buộc",
        });
      }

      const result = await thiSinhService.getThiSinhCertificateInfo(maThiSinh);

      if (!result.success) {
        return res.status(404).json(result);
      }

      res.status(200).json(result);
    } catch (error) {
      console.error("Error in getCertificateInfo:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi server",
        error: error.message,
      });
    }
  },

  saveCertificateInfo: async (req, res) => {
    try {
      const { maThiSinh, maChungChi } = req.params;
      const certificateData = req.body;

      if (!maThiSinh || !maChungChi || !certificateData) {
        return res.status(400).json({
          success: false,
          message: "Mã thí sinh, mã chứng chỉ và dữ liệu chứng chỉ là bắt buộc",
        });
      }

      // Validate required fields for ChungChi
      if (!certificateData.TrangThai || !certificateData.NgayCap) {
        return res.status(400).json({
          success: false,
          message: "TrangThai và NgayCap là bắt buộc",
        });
      }

      // Validate required fields for KetQuaThi
      if (certificateData.Diem === undefined || !certificateData.NgayCongBo) {
        return res.status(400).json({
          success: false,
          message: "Diem và NgayCongBo là bắt buộc",
        });
      }

      const result = await thiSinhService.saveCertificateInfo(
        maChungChi,
        certificateData
      );

      if (!result.success) {
        return res.status(400).json(result);
      }

      res.status(201).json(result);
    } catch (error) {
      console.error("Error in saveCertificateInfo:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi server khi lưu thông tin chứng chỉ",
        error: error.message,
      });
    }
  },
};

module.exports = thiSinhController;
