const sequelize = require("../config/database");
const { QueryTypes } = require("sequelize");

const thiSinhService = {
  // Lấy thông tin chứng chỉ mới nhất của mỗi loại chứng chỉ của thí sinh
  // Và sắp xếp theo ngày cấp mới nhất
  getThiSinhCertificateInfo: async (maThiSinh) => {
    try {
      // Kiểm tra xem maThiSinh có tồn tại trong cơ sở dữ liệu không
      const checkExist = await sequelize.query(
        `SELECT COUNT(*) as count FROM ThiSinh WHERE MaThiSinh = :maThiSinh`,
        {
          replacements: { maThiSinh },
          type: QueryTypes.SELECT,
        }
      );
      if (checkExist[0].count === 0) {
        return {
          success: false,
          message: "Thí sinh không tồn tại",
        };
      }

      const query = `
                    WITH LatestCertificates AS (
                        SELECT 
                            cc.MaChungChi,
                            cc.LoaiChungChi,
                            cc.TrangThai,
                            cc.NgayCap,
                            cc.NgayNhan,
                            kq.Diem,
                            kq.NgayCongBo,
                            ROW_NUMBER() OVER (
                                PARTITION BY cc.LoaiChungChi 
                                ORDER BY cc.NgayCap DESC
                            ) as rn
                        FROM ThiSinh ts
                        INNER JOIN PhieuDuThi pdt ON ts.MaThiSinh = pdt.MaThiSinh
                        INNER JOIN KetQuaThi kq ON pdt.MaPhieuDuThi = kq.MaPhieuDuThi
                        INNER JOIN ChungChi cc ON kq.MaKetQua = cc.MaKetQua
                        WHERE ts.MaThiSinh = :maThiSinh
                    )
                    SELECT 
                        MaChungChi,
                        LoaiChungChi,
                        TrangThai,
                        NgayCap,
                        NgayNhan,
                        Diem,
                        NgayCongBo
                    FROM LatestCertificates
                    WHERE rn = 1
                    ORDER BY NgayCap DESC
                `;

      const results = await sequelize.query(query, {
        replacements: { maThiSinh },
        type: QueryTypes.SELECT,
      });

      if (results.length === 0) {
        return {
          success: false,
          message: "Không tìm thấy thông tin chứng chỉ cho thí sinh này",
        };
      }

      return {
        success: true,
        message: "Lấy thông tin chứng chỉ thành công",
        data: results,
      };
    } catch (error) {
      console.error("Error in getThiSinhCertificateInfo:", error);
      return {
        success: false,
        message: "Lỗi server khi lấy thông tin chứng chỉ",
        error: error.message,
      };
    }
  },

  // Lưu thông tin chứng chỉ và kết quả thi cho thí sinh
  // Cập nhật thông tin chứng chỉ và kết quả thi
  saveCertificateInfo: async (maChungChi, certificateData) => {
    const transaction = await sequelize.transaction();

    try {
      const parsedMaChungChi = parseInt(maChungChi, 10);
      if (isNaN(parsedMaChungChi)) {
        throw new Error("Mã chứng chỉ không hợp lệ");
      }

      // First, check if the certificate exists
      const checkCertificate = await sequelize.query(
        `SELECT cc.MaChungChi, cc.MaKetQua
       FROM ChungChi cc
       WHERE cc.MaChungChi = :maChungChi`,
        {
          replacements: { maChungChi: parsedMaChungChi },
          type: QueryTypes.SELECT,
          transaction,
        }
      );

      if (checkCertificate.length === 0) {
        throw new Error("Không tìm thấy chứng chỉ cần cập nhật");
      }

      const parsedMaKetQua = parseInt(checkCertificate[0].MaKetQua, 10);

      // Update KetQuaThi table if Diem or NgayCongBo is provided
      if (certificateData.Diem !== undefined || certificateData.NgayCongBo) {
        await sequelize.query(
          `UPDATE KetQuaThi
         SET Diem = COALESCE(:diem, Diem),
             NgayCongBo = COALESCE(:ngayCongBo, NgayCongBo)
         WHERE MaKetQua = :maKetQua`,
          {
            replacements: {
              diem: certificateData.Diem,
              ngayCongBo: certificateData.NgayCongBo,
              maKetQua: parsedMaKetQua,
            },
            type: QueryTypes.UPDATE,
            transaction,
          }
        );
      }

      // Update ChungChi table
      await sequelize.query(
        `UPDATE ChungChi
       SET TrangThai = COALESCE(:trangThai, TrangThai),
           NgayCap = COALESCE(:ngayCap, NgayCap),
           NgayNhan = COALESCE(:ngayNhan, NgayNhan)
       WHERE MaChungChi = :maChungChi`,
        {
          replacements: {
            trangThai: certificateData.TrangThai,
            ngayCap: certificateData.NgayCap,
            ngayNhan: certificateData.NgayNhan,
            maChungChi: parsedMaChungChi, // Use parsedMaChungChi instead of maChungChi
          },
          type: QueryTypes.UPDATE,
          transaction,
        }
      );

      // Commit the transaction
      await transaction.commit();

      // Return success response
      return {
        success: true,
        message: "Cập nhật thông tin chứng chỉ thành công",
        data: {
          MaChungChi: parsedMaChungChi,
          MaKetQua: parsedMaKetQua,
        },
      };
    } catch (error) {
      // Only rollback if transaction hasn't been committed yet
      if (!transaction.finished) {
        await transaction.rollback();
      }
      console.error("Error in saveCertificateInfo:", error);
      return {
        success: false,
        message: error.message || "Lỗi server khi cập nhật thông tin chứng chỉ",
        error: error.message,
      };
    }
  },
};

module.exports = thiSinhService;
