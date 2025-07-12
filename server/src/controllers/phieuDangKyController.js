const {
  PhieuDangKy,
  KhachHang,
  LichThi,
  NhanVien,
  ThiSinh,
} = require("../models");
const sequelize = require("../config/database");
const { QueryTypes } = require("sequelize");

const phieuDangKyController = {
  getAllPhieuDangKy: async (req, res) => {
    try {
      // Extract pagination parameters from query string
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      // Validate pagination parameters
      if (page < 1 || limit < 1) {
        return res.status(400).json({
          success: false,
          message: "Page và limit phải là số nguyên dương",
        });
      }

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

      res.status(200).json({
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
      });
    } catch (error) {
      console.error("Lỗi khi lấy danh sách phiếu đăng ký:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi server khi lấy danh sách phiếu đăng ký",
        error: error.message,
      });
    }
  },

  getPhieuDangKyByMaThiSinhId: async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID không hợp lệ",
      });
    }

    try {
      // Extract pagination parameters from query string
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      // Validate pagination parameters
      if (page < 1 || limit < 1) {
        return res.status(400).json({
          success: false,
          message: "Page và limit phải là số nguyên dương",
        });
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
        replacements: { maThiSinh: id },
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
                where: { MaThiSinh: id },
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
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy phiếu đăng ký cho thí sinh này",
        });
      }

      const totalPages = Math.ceil(totalCount / limit);

      res.status(200).json({
        success: true,
        message: "Lấy thông tin phiếu đăng ký thành công",
        data: phieuDangKy,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalCount, // Now uses the accurate filtered count
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      });
    } catch (error) {
      console.error("Lỗi khi lấy thông tin phiếu đăng ký:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi server khi lấy thông tin phiếu đăng ký",
        error: error.message,
      });
    }
  },
};

module.exports = phieuDangKyController;
