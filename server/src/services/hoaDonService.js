const sequelize = require("../config/database");
const { QueryTypes } = require("sequelize");
const emailService = require("../services/emailService");

const hoaDonService = {
  getHoaDonById: async (maHoaDon) => {
    try {
      // Parse and validate MaHoaDon
      const parsedMaHoaDon = parseInt(maHoaDon);

      if (isNaN(parsedMaHoaDon)) {
        return {
          success: false,
          message: "Mã hóa đơn không hợp lệ",
        };
      }

      // Use raw SQL query to get the required data with calculated fields
      const query = `
        SELECT 
          hd.MaHoaDon,
          kh.Ten as TenKhachHang,
          kh.Email,
          hd.SoTien,
          hd.MucGiamGia as GiamGia,
          hd.SoTien * (1 - ISNULL(hd.MucGiamGia, 0) / 100) as ThanhTien
        FROM HoaDon hd
        INNER JOIN PhieuDangKy pdk ON hd.MaPhieuDangKy = pdk.MaPhieuDangKy
        INNER JOIN KhachHang kh ON pdk.MaKhachHang = kh.MaKhachHang
        WHERE hd.MaHoaDon = :maHoaDon
      `;

      const result = await sequelize.query(query, {
        replacements: { maHoaDon: parsedMaHoaDon },
        type: QueryTypes.SELECT,
      });

      if (!result || result.length === 0) {
        return {
          success: false,
          message: "Không tìm thấy hóa đơn",
        };
      }

      const hoaDonData = result[0];

      return {
        success: true,
        message: "Lấy thông tin hóa đơn thành công",
        data: {
          MaHoaDon: hoaDonData.MaHoaDon,
          TenKhachHang: hoaDonData.TenKhachHang,
          Email: hoaDonData.Email,
          SoTien: parseFloat(hoaDonData.SoTien),
          GiamGia: hoaDonData.GiamGia ? parseFloat(hoaDonData.GiamGia) : 0,
          ThanhTien: parseFloat(hoaDonData.ThanhTien),
        },
      };
    } catch (error) {
      console.error("Error in getHoaDonById service:", error);
      return {
        success: false,
        message: "Lỗi server khi lấy thông tin hóa đơn",
        error: error.message,
      };
    }
  },

  sendInvoiceEmail: async (maHoaDon, HinhThucThanhToan) => {
    try {
      // First, get the invoice data
      const invoiceResult = await hoaDonService.getHoaDonById(maHoaDon);

      if (!invoiceResult.success) {
        return invoiceResult;
      }

      // Check if invoiceResult does not has payment method
      // then add the default value ZaloPay
      invoiceResult.data.HinhThucThanhToan = HinhThucThanhToan || "ZaloPay";

      // Send the email
      const emailResult = await emailService.sendInvoiceEmail(
        invoiceResult.data
      );

      return emailResult;
    } catch (error) {
      console.error("Error in sendInvoiceEmail service:", error);
      return {
        success: false,
        message: "Lỗi server khi gửi email hóa đơn",
        error: error.message,
      };
    }
  },
};

module.exports = hoaDonService;
