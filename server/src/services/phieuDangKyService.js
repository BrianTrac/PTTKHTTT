const {
  PhieuDangKy,
  KhachHang,
  LichThi,
  NhanVien,
  ThiSinh,
} = require("../models");
const sequelize = require("../config/database");
const { QueryTypes } = require("sequelize");

const phieuDangKyService = {
  getAllPhieuDangKy: async (page, limit) => {
    try {
      const offset = (page - 1) * limit;

      const { count, rows: phieuDangKyList } =
        await PhieuDangKy.findAndCountAll({
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
          limit,
          offset,
          distinct: true, // Important for accurate count with includes
        });

      const totalPages = Math.ceil(count / limit);

      return {
        success: true,
        message: "Lấy danh sách phiếu đăng ký thành công",
        data: phieuDangKyList,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: count,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      };
    } catch (error) {
      console.error("Error in getAllPhieuDangKy service:", error);
      return {
        success: false,
        message: "Lỗi server khi lấy danh sách phiếu đăng ký",
        error: error.message,
      };
    }
  },

  getPhieuDangKyByMaThiSinhId: async (maThiSinh, page, limit) => {
    try {
      const offset = (page - 1) * limit;

      // Parse and validate MaThiSinh
      const parsedMaThiSinh = parseInt(maThiSinh);
      if (isNaN(parsedMaThiSinh)) {
        return {
          success: false,
          message: "Mã thí sinh không hợp lệ",
        };
      }

      // Use raw SQL query to get accurate count for filtered results
      const countQuery = `
        SELECT COUNT(DISTINCT pd.MaPhieuDangKy) as total
        FROM PhieuDangKy pd
        INNER JOIN KhachHang kh ON pd.MaKhachHang = kh.MaKhachHang
        INNER JOIN ThiSinh ts ON kh.MaKhachHang = ts.MaKhachHang
        WHERE ts.MaThiSinh = :maThiSinh
      `;

      const countResult = await sequelize.query(countQuery, {
        replacements: { maThiSinh: parsedMaThiSinh },
        type: QueryTypes.SELECT,
      });

      const totalCount = countResult[0].total;

      // Then get the paginated results
      const phieuDangKy = await PhieuDangKy.findAll({
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
            include: [
              {
                model: ThiSinh,
                as: "ThiSinh",
                where: { MaThiSinh: parsedMaThiSinh },
                attributes: ["MaThiSinh", "Ten", "CCCD", "NgaySinh"],
              },
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
        ],
        order: [["NgayDangKy", "DESC"]],
        limit,
        offset,
      });

      if (!phieuDangKy || phieuDangKy.length === 0) {
        return {
          success: false,
          message: "Không tìm thấy phiếu đăng ký cho thí sinh này",
        };
      }

      const totalPages = Math.ceil(totalCount / limit);

      return {
        success: true,
        message: "Lấy thông tin phiếu đăng ký thành công",
        data: phieuDangKy,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalCount,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      };
    } catch (error) {
      console.error("Error in getPhieuDangKyByMaThiSinhId service:", error);
      return {
        success: false,
        message: "Lỗi server khi lấy thông tin phiếu đăng ký",
        error: error.message,
      };
    }
  },
};

module.exports = phieuDangKyService;
