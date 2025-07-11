USE examination_management;
GO

-- Insert dữ liệu KhachHang
INSERT INTO KhachHang (Ten, Email, DiaChi, SDT, NgaySinh, CCCD, LoaiKhachHang) VALUES
(N'Nguyễn Văn An', 'nguyenvanan@email.com', N'123 Đường Lê Lợi, Quận 1, TP.HCM', '0901234567', '1990-05-15', '001090012345', 'Tu_do'),
(N'Trần Thị Bình', 'tranthibinh@email.com', N'456 Đường Nguyễn Huệ, Quận 1, TP.HCM', '0912345678', '1985-08-20', '001085012346', 'Tu_do'),
(N'Lê Minh Cường', 'leminhcuong@email.com', N'789 Đường Pasteur, Quận 3, TP.HCM', '0923456789', '1992-12-10', '001092012347', 'Tu_do'),
(N'Phạm Thị Dung', 'phamthidung@email.com', N'321 Đường Cách Mạng Tháng 8, Quận 10, TP.HCM', '0934567890', '1988-03-25', '001088012348', 'Tu_do'),
(N'Công ty TNHH ABC', 'contact@abc.com', N'100 Đường Điện Biên Phủ, Quận Bình Thạnh, TP.HCM', '0812345678', NULL, '0123456789', 'Don_vi');
GO

-- Insert dữ liệu NhanVien
INSERT INTO NhanVien (VaiTro, HoTen, Email, SDT) VALUES
('Quan_ly', N'Nguyễn Thị Quản Lý', 'quanly@company.com', '0901111111'),
('Nhan_vien_tiep_nhan', N'Trần Văn Tiếp Nhận', 'tiepnhan@company.com', '0902222222'),
('Nhan_vien_cham_thi', N'Lê Thị Chấm Thi', 'chamthi@company.com', '0903333333'),
('Nhan_vien_coi_thi', N'Phạm Văn Coi Thi 1', 'coithi1@company.com', '0904444444'),
('Nhan_vien_coi_thi', N'Hoàng Thị Coi Thi 2', 'coithi2@company.com', '0905555555');
GO

-- Insert dữ liệu DonViChamThi
INSERT INTO DonViChamThi (TenDonViChamThi, ThongTinLienLac) VALUES
(N'Trung tâm Chấm thi Quốc gia', N'Địa chỉ: 15 Đường Lê Thánh Tôn, Quận 1, TP.HCM. SĐT: 028-3822-5566'),
(N'Viện Khảo thí và Đánh giá Giáo dục', N'Địa chỉ: 25 Đường Nguyễn Du, Quận 1, TP.HCM. SĐT: 028-3829-7700');
GO

-- Insert dữ liệu DanhSachCho
INSERT INTO DanhSachCho (NgayGiaHan, SoLuong) VALUES
('2025-09-15 10:00:00', 20),
('2025-10-20 14:00:00', 25);
GO

-- Insert dữ liệu LichThi
INSERT INTO LichThi (TenLichThi, ThoiGianThi, SoLuongDaDangKi, SoLuongToiThieu, SoLuongToiDa) VALUES
(N'Kỳ thi chứng chỉ tin học cơ bản tháng 8/2025', '2025-08-15 08:00:00', 15, 10, 30),
(N'Kỳ thi chứng chỉ tin học nâng cao tháng 8/2025', '2025-08-22 08:00:00', 12, 10, 25),
(N'Kỳ thi chứng chỉ an toàn thông tin tháng 9/2025', '2025-09-05 09:00:00', 8, 8, 20);
GO

-- Insert dữ liệu PhongThi
INSERT INTO PhongThi (TenPhong, SucChua, DiaDiem, MaLichThi) VALUES
(N'Phòng A101', 20, N'Tầng 1, Tòa nhà A, 123 Đường Lê Lợi, Quận 1, TP.HCM', 1),
(N'Phòng A102', 15, N'Tầng 1, Tòa nhà A, 123 Đường Lê Lợi, Quận 1, TP.HCM', 1),
(N'Phòng B201', 15, N'Tầng 2, Tòa nhà B, 456 Đường Nguyễn Huệ, Quận 1, TP.HCM', 2),
(N'Phòng C301', 10, N'Tầng 3, Tòa nhà C, 789 Đường Pasteur, Quận 3, TP.HCM', 3);
GO

-- Insert dữ liệu PhieuDangKy
INSERT INTO PhieuDangKy (LoaiKiThi, NgayDangKy, TrangThai, MaKhachHang, MaLichThi, MaNhanVien) VALUES
('TOEIC', '2025-07-01', 'Da_duyet', 1, 1, 2),
('IELTS', '2025-07-02', 'Da_duyet', 2, 1, 2),
('SAT', '2025-07-03', 'Da_duyet', 3, 2, 2),
('GRE', '2025-07-04', 'Da_duyet', 4, 2, 2),
('GMAT', '2025-07-05', 'Cho_duyet', 1, 3, 2),
('TOEIC', '2025-07-06', 'Tu_choi', 2, 3, 2);
GO

-- Insert dữ liệu ThiSinh
INSERT INTO ThiSinh (Ten, NgaySinh, CCCD, Email, MaKhachHang, MaPhieuDangKy) VALUES
(N'Nguyễn Văn An', '1990-05-15', '001090012345', 'nguyenvanan@email.com', 1, 1),
(N'Trần Thị Bình', '1985-08-20', '001085012346', 'tranthibinh@email.com', 2, 2),
(N'Lê Minh Cường', '1992-12-10', '001092012347', 'leminhcuong@email.com', 3, 3),
(N'Phạm Thị Dung', '1988-03-25', '001088012348', 'phamthidung@email.com', 4, 4);
GO

-- Insert dữ liệu HoaDon
INSERT INTO HoaDon (SoTien, MucGiamGia, HinhThucThanhToan, NgayThanhToan, MaThanhToan, TrangThai, GiaHan, MaPhieuDangKy) VALUES
(500000.00, 0.00, 'Chuyen_khoan', '2025-07-01', 'TXN001', 'Da_thanh_toan', 0, 1),
(750000.00, 10.00, 'The_tin_dung', '2025-07-02', 'TXN002', 'Da_thanh_toan', 0, 2),
(1000000.00, 0.00, 'Tien_mat', '2025-07-03', 'TXN003', 'Da_thanh_toan', 0, 3),
(1200000.00, 5.00, 'Chuyen_khoan', '2025-07-04', 'TXN004', 'Da_thanh_toan', 0, 4),
(800000.00, 0.00, 'The_tin_dung', '2025-07-05', 'TXN005', 'Chua_thanh_toan', 0, 5),
(900000.00, 0.00, 'Chuyen_khoan', '2025-07-06', 'TXN006', 'Huy', 0, 6);
GO

-- Insert dữ liệu PhieuDuThi
INSERT INTO PhieuDuThi (SoBaoDanh, NgayPhatHanh, TrangThai, MaPhieuDangKy, MaThiSinh) VALUES
('BD001001', '2025-07-10', 'Da_thi', 1, 1),
('BD001002', '2025-07-10', 'Da_thi', 2, 2),
('BD002001', '2025-07-15', 'Da_thi', 3, 3),
('BD002002', '2025-07-15', 'Cho_thi', 4, 4);
GO

-- Insert dữ liệu KetQuaThi
INSERT INTO KetQuaThi (Diem, NgayCongBo, MaPhieuDuThi, MaDonViChamThi) VALUES
(85.50, '2025-08-20', 1, 1),
(78.25, '2025-08-20', 2, 1),
(92.00, '2025-08-25', 3, 2);
GO

-- Insert dữ liệu ChungChi
INSERT INTO ChungChi (LoaiChungChi, NgayCap, NgayNhan, TrangThai, MaKetQua) VALUES
('TOEIC', '2025-08-25', '2025-08-30', 'Da_nhan', 1),
('IELTS', '2025-08-25', NULL, 'Da_cap', 2),
('SAT', '2025-08-30', NULL, 'Da_cap', 3);
GO

-- Insert dữ liệu YeuCauGiaHan
INSERT INTO YeuCauGiaHan (LyDo, BangChung, PhiGiaHan, SoLanDaGiaHan, NgayYeuCau, TrangThai, MaPhieuDuThi, MaNhanVien, MaDanhSachCho) VALUES
(N'Bệnh nặng không thể tham gia thi theo lịch', 'https://res.cloudinary.com/dvzhmi7a9/image/upload/v1752205277/giay-chung-nhan-benh_gmbnm5.png', 200000.00, 0, '2025-07-25', 'Da_duyet', 4, 1, 1),
(N'Công tác đột xuất của công ty', 'https://res.cloudinary.com/dvzhmi7a9/image/upload/v1752205275/lenh-cong-tac_u6ywx4.png', 150000.00, 0, '2025-08-01', 'Cho_duyet', 4, 1, 2);
GO

-- Insert dữ liệu LichThi_NhanVienCoiThi (quan hệ nhiều-nhiều)
INSERT INTO LichThi_NhanVienCoiThi (MaLichThi, MaNhanVienCoiThi) VALUES
(1, 4), -- Lịch thi 1 - Nhân viên coi thi 1
(1, 5), -- Lịch thi 1 - Nhân viên coi thi 2
(2, 4), -- Lịch thi 2 - Nhân viên coi thi 1
(2, 5), -- Lịch thi 2 - Nhân viên coi thi 2
(3, 4), -- Lịch thi 3 - Nhân viên coi thi 1
(3, 5); -- Lịch thi 3 - Nhân viên coi thi 2
GO

PRINT 'Simplified sample data inserted successfully!';
GO