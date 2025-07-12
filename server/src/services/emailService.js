const nodemailer = require("nodemailer");
const paymentConfig = require("../config/paymentConfig");

// Configure your email transporter (example with Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

const emailService = {
  sendInvoiceEmail: async (invoiceData) => {
    try {
      const {
        MaHoaDon,
        TenKhachHang,
        Email,
        SoTien,
        GiamGia,
        ThanhTien,
        HinhThucThanhToan,
      } = invoiceData;

      const method = paymentConfig.paymentMethods[HinhThucThanhToan];
      const accountInfo = method ? method.accountInfo : null;

      // Create email content
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: Email,
        subject: `Hóa đơn thanh toán #${MaHoaDon} - Xác nhận đăng ký thi`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #2c3e50; text-align: center; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
              HÓA ĐƠN THANH TOÁN
            </h2>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #34495e;">Thông tin hóa đơn:</h3>
              <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Mã hóa đơn:</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">#${MaHoaDon}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Tên khách hàng:</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${TenKhachHang}</td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${Email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Số tiền gốc:</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${SoTien.toLocaleString(
                    "vi-VN"
                  )} VNĐ</td>
                </tr>
                <tr style="background-color: #f8f9fa;">
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Giảm giá:</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${GiamGia}%</td>
                </tr>
                <tr style="background-color: #e8f5e8;">
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; color: #27ae60;">Thành tiền:</td>
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; color: #27ae60; font-size: 18px;">${ThanhTien.toLocaleString(
                    "vi-VN"
                  )} VNĐ</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Hình thức thanh toán:</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${HinhThucThanhToan}</td>
                </tr>
              </table>
               ${
                 accountInfo
                   ? `
                <div style="margin-top: 20px;">
                  <h3 style="color: #34495e;">Thông tin chuyển khoản:</h3>
                  <ul style="padding-left: 20px;">
                    ${
                      accountInfo.accountNumber
                        ? `<li>Số tài khoản: <b>${accountInfo.accountNumber}</b></li>`
                        : ""
                    }
                    ${
                      accountInfo.accountName
                        ? `<li>Chủ tài khoản: <b>${accountInfo.accountName}</b></li>`
                        : ""
                    }
                    ${
                      accountInfo.bankCode
                        ? `<li>Ngân hàng: <b>${method.displayName}</b></li>`
                        : ""
                    }
                    ${
                      accountInfo.phone
                        ? `<li>Số điện thoại ZaloPay: <b>${accountInfo.phone}</b></li>`
                        : ""
                    }
                  </ul>
                </div>
              `
                   : ""
               }
            </div>

            <div style="margin: 30px 0; padding: 15px; background-color: #e3f2fd; border-radius: 5px;">
              <p style="margin: 0; color: #1976d2; font-weight: bold;">
                ✓ Cảm ơn bạn đã đăng ký thi tại trung tâm của chúng tôi!
              </p>
              <p style="margin: 10px 0 0 0; color: #666;">
                Vui lòng giữ lại email này để làm bằng chứng thanh toán.
              </p>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="color: #7f8c8d; font-size: 12px; margin: 0;">
                Email này được gửi tự động, vui lòng không trả lời.
              </p>
              <p style="color: #7f8c8d; font-size: 12px; margin: 5px 0 0 0;">
                © 2025 Trung tâm Thi chứng chỉ Quốc tế
              </p>
            </div>
          </div>
        `,
      };

      // Send email
      const info = await transporter.sendMail(mailOptions);

      return {
        success: true,
        message: "Email hóa đơn đã được gửi thành công",
        data: {
          messageId: info.messageId,
          recipient: Email,
        },
      };
    } catch (error) {
      console.error("Error in sendInvoiceEmail:", error);
      return {
        success: false,
        message: "Lỗi khi gửi email hóa đơn",
        error: error.message,
      };
    }
  },
};

module.exports = emailService;
