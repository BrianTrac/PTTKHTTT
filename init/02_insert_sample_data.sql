USE examination_management;
GO

-- Insert KhachHang data
INSERT INTO KhachHang (Ten, Email, DiaChi, SDT, NgaySinh, CCCD, LoaiKhachHang) VALUES
(N'Nguyễn Văn An', 'nguyenvanan@email.com', N'123 Đường Lê Lợi, Quận 1, TP.HCM', '0901234567', '1990-05-15', '001090012345', 'Tu_do'),
(N'Trần Thị Bình', 'tranthibinh@email.com', N'456 Đường Nguyễn Huệ, Quận 1, TP.HCM', '0912345678', '1985-08-20', '001085012346', 'Tu_do'),
(N'Lê Minh Cường', 'leminhcuong@email.com', N'789 Đường Pasteur, Quận 3, TP.HCM', '0923456789', '1992-12-10', '001092012347', 'Tu_do'),
(N'Phạm Thị Dung', 'phamthidung@email.com', N'321 Đường Cách Mạng Tháng 8, Quận 10, TP.HCM', '0934567890', '1988-03-25', '001088012348', 'Tu_do'),
(N'Võ Thị Em', 'vothiem@email.com', N'555 Đường Hai Bà Trưng, Quận 3, TP.HCM', '0945678901', '1995-09-12', '001095012349', 'Tu_do'),
(N'Đặng Văn Phúc', 'dangvanphuc@email.com', N'777 Đường Trần Hưng Đạo, Quận 5, TP.HCM', '0956789012', '1993-11-08', '001093012350', 'Tu_do'),
(N'Công ty TNHH ABC', 'contact@abc.com', N'100 Đường Điện Biên Phủ, Quận Bình Thạnh, TP.HCM', '0812345678', NULL, '0123456789', 'Don_vi'),
(N'Trường Đại học XYZ', 'admissions@xyz.edu.vn', N'200 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM', '0823456789', NULL, '0987654321', 'Don_vi'),
(N'Hoàng Minh Tuấn', 'hoangminhtuan@email.com', N'888 Đường Võ Văn Tần, Quận 3, TP.HCM', '0967890123', '1991-07-18', '001091012351', 'Tu_do'),
(N'Nguyễn Thị Lan', 'nguyenthilan@email.com', N'999 Đường Điện Biên Phủ, Quận 1, TP.HCM', '0978901234', '1994-06-22', '001094012352', 'Tu_do');
GO

-- Insert NhanVien data
INSERT INTO NhanVien (VaiTro, HoTen, Email, SDT) VALUES
('Quan_ly', N'Nguyễn Thị Quản Lý', 'quanly@examcenter.com', '0901111111'),
('Nhan_vien_tiep_nhan', N'Trần Văn Tiếp Nhận', 'tiepnhan@examcenter.com', '0902222222'),
('Nhan_vien_tiep_nhan', N'Lê Thị Thu Hà', 'thuha@examcenter.com', '0902222223'),
('Nhan_vien_cham_thi', N'Phạm Thị Chấm Thi', 'chamthi@examcenter.com', '0903333333'),
('Nhan_vien_coi_thi', N'Hoàng Văn Coi Thi 1', 'coithi1@examcenter.com', '0904444444'),
('Nhan_vien_coi_thi', N'Võ Thị Coi Thi 2', 'coithi2@examcenter.com', '0905555555'),
('Nhan_vien_coi_thi', N'Đỗ Văn Coi Thi 3', 'coithi3@examcenter.com', '0906666666');
GO

-- Insert DonViChamThi data
INSERT INTO DonViChamThi (TenDonViChamThi, ThongTinLienLac) VALUES
(N'Trung tâm Chấm thi Quốc gia TOEIC/IELTS', N'Địa chỉ: 15 Đường Lê Thánh Tôn, Quận 1, TP.HCM. SĐT: 028-3822-5566. Email: contact@toeic-ielts.org.vn'),
(N'Viện Khảo thí Quốc tế SAT/GRE/GMAT', N'Địa chỉ: 25 Đường Nguyễn Du, Quận 1, TP.HCM. SĐT: 028-3829-7700. Email: info@international-tests.org.vn');
GO

-- Insert DanhSachCho data
INSERT INTO DanhSachCho (NgayGiaHan, SoLuong) VALUES
('2025-09-15 10:00:00', 25),
('2025-10-20 14:00:00', 30),
('2025-11-25 09:00:00', 20);
GO

-- Insert LichThi data
INSERT INTO LichThi (TenLichThi, ThoiGianThi, SoLuongDaDangKi, SoLuongToiThieu, SoLuongToiDa) VALUES
(N'Kỳ thi TOEIC tháng 8/2025', '2025-08-15 08:00:00', 18, 10, 40),
(N'Kỳ thi IELTS tháng 8/2025', '2025-08-22 08:00:00', 15, 8, 30),
(N'Kỳ thi SAT tháng 9/2025', '2025-09-05 09:00:00', 12, 8, 25),
(N'Kỳ thi GRE tháng 9/2025', '2025-09-12 09:00:00', 10, 6, 20),
(N'Kỳ thi GMAT tháng 10/2025', '2025-10-03 08:30:00', 8, 5, 15);
GO

-- Insert PhongThi data
INSERT INTO PhongThi (TenPhong, SucChua, DiaDiem, MaLichThi) VALUES
-- Phòng thi cho TOEIC
(N'Phòng A101', 20, N'Tầng 1, Tòa nhà A, 123 Đường Lê Lợi, Quận 1, TP.HCM', 1),
(N'Phòng A102', 20, N'Tầng 1, Tòa nhà A, 123 Đường Lê Lợi, Quận 1, TP.HCM', 1),
-- Phòng thi cho IELTS
(N'Phòng B201', 15, N'Tầng 2, Tòa nhà B, 456 Đường Nguyễn Huệ, Quận 1, TP.HCM', 2),
(N'Phòng B202', 15, N'Tầng 2, Tòa nhà B, 456 Đường Nguyễn Huệ, Quận 1, TP.HCM', 2),
-- Phòng thi cho SAT
(N'Phòng C301', 15, N'Tầng 3, Tòa nhà C, 789 Đường Pasteur, Quận 3, TP.HCM', 3),
(N'Phòng C302', 10, N'Tầng 3, Tòa nhà C, 789 Đường Pasteur, Quận 3, TP.HCM', 3),
-- Phòng thi cho GRE
(N'Phòng D401', 12, N'Tầng 4, Tòa nhà D, 321 Đường Cách Mạng Tháng 8, Quận 10, TP.HCM', 4),
(N'Phòng D402', 8, N'Tầng 4, Tòa nhà D, 321 Đường Cách Mạng Tháng 8, Quận 10, TP.HCM', 4),
-- Phòng thi cho GMAT
(N'Phòng E501', 10, N'Tầng 5, Tòa nhà E, 555 Đường Hai Bà Trưng, Quận 3, TP.HCM', 5),
(N'Phòng E502', 5, N'Tầng 5, Tòa nhà E, 555 Đường Hai Bà Trưng, Quận 3, TP.HCM', 5);
GO

-- Insert PhieuDangKy data
INSERT INTO PhieuDangKy (LoaiKiThi, NgayDangKy, TrangThai, MaKhachHang, MaLichThi, MaNhanVien) VALUES
-- Registrations for TOEIC exam
('TOEIC', '2025-07-01', 'Da_duyet', 1, 1, 2),
('TOEIC', '2025-07-02', 'Da_duyet', 2, 1, 2),
('TOEIC', '2025-07-03', 'Da_duyet', 3, 1, 2),
('TOEIC', '2025-07-04', 'Da_duyet', 4, 1, 2),
('TOEIC', '2025-07-05', 'Da_duyet', 5, 1, 3),
-- Registrations for IELTS exam
('IELTS', '2025-07-06', 'Da_duyet', 1, 2, 2),
('IELTS', '2025-07-07', 'Da_duyet', 2, 2, 2),
('IELTS', '2025-07-08', 'Da_duyet', 6, 2, 3),
('IELTS', '2025-07-09', 'Da_duyet', 7, 2, 3),
-- Registrations for SAT exam
('SAT', '2025-07-10', 'Da_duyet', 9, 3, 2),
('SAT', '2025-07-11', 'Da_duyet', 3, 3, 2),
('SAT', '2025-07-12', 'Da_duyet', 5, 3, 3),
-- Registrations for GRE exam
('GRE', '2025-07-13', 'Da_duyet', 2, 4, 2),
('GRE', '2025-07-14', 'Da_duyet', 4, 4, 3),
('GRE', '2025-07-15', 'Da_duyet', 6, 4, 3),
-- Registrations for GMAT exam
('GMAT', '2025-07-16', 'Da_duyet', 3, 5, 2),
('GMAT', '2025-07-17', 'Da_duyet', 5, 5, 3),
-- Some pending/rejected registrations
('TOEIC', '2025-07-18', 'Cho_duyet', 6, 1, 2),
('IELTS', '2025-07-19', 'Tu_choi', 4, 2, 2),
('SAT', '2025-07-20', 'Cho_duyet', 10, 3, 3);
GO

-- Insert ThiSinh data (only for approved registrations, with unique CCCD for each registration)
INSERT INTO ThiSinh (Ten, NgaySinh, CCCD, Email, MaKhachHang, MaPhieuDangKy) VALUES
-- For TOEIC registrations
(N'Nguyễn Văn An', '1990-05-15', '001090012345', 'nguyenvanan@email.com', 1, 1),
(N'Trần Thị Bình', '1985-08-20', '001085012346', 'tranthibinh@email.com', 2, 2),
(N'Lê Minh Cường', '1992-12-10', '001092012347', 'leminhcuong@email.com', 3, 3),
(N'Phạm Thị Dung', '1988-03-25', '001088012348', 'phamthidung@email.com', 4, 4),
(N'Võ Thị Em', '1995-09-12', '001095012349', 'vothiem@email.com', 5, 5),
-- For IELTS registrations (same person with different CCCD format for different exam)
(N'Nguyễn Văn An', '1990-05-15', '001090012355', 'nguyenvanan@email.com', 1, 6),
(N'Trần Thị Bình', '1985-08-20', '001085012356', 'tranthibinh@email.com', 2, 7),
(N'Đặng Văn Phúc', '1993-11-08', '001093012350', 'dangvanphuc@email.com', 6, 8),
(N'Nguyễn Thị Lan', '1994-06-22', '001094012352', 'nguyenthilan@email.com', 7, 9),
-- For SAT registrations
(N'Hoàng Minh Tuấn', '1991-07-18', '001091012351', 'hoangminhtuan@email.com', 9, 10),
(N'Lê Minh Cường', '1992-12-10', '001092012357', 'leminhcuong@email.com', 3, 11),
(N'Võ Thị Em', '1995-09-12', '001095012359', 'vothiem@email.com', 5, 12),
-- For GRE registrations
(N'Trần Thị Bình', '1985-08-20', '001085012366', 'tranthibinh@email.com', 2, 13),
(N'Phạm Thị Dung', '1988-03-25', '001088012358', 'phamthidung@email.com', 4, 14),
(N'Đặng Văn Phúc', '1993-11-08', '001093012360', 'dangvanphuc@email.com', 6, 15),
-- For GMAT registrations
(N'Lê Minh Cường', '1992-12-10', '001092012367', 'leminhcuong@email.com', 3, 16),
(N'Võ Thị Em', '1995-09-12', '001095012369', 'vothiem@email.com', 5, 17);
GO

-- Insert HoaDon data
INSERT INTO HoaDon (SoTien, MucGiamGia, HinhThucThanhToan, NgayThanhToan, MaThanhToan, TrangThai, GiaHan, MaPhieuDangKy) VALUES
-- TOEIC exam fees
(615000.00, 0.00, 'Chuyen_khoan', '2025-07-01', 'TXN001', 'Da_thanh_toan', 0, 1),
(615000.00, 0.00, 'The_tin_dung', '2025-07-02', 'TXN002', 'Da_thanh_toan', 0, 2),
(615000.00, 0.00, 'Tien_mat', '2025-07-03', 'TXN003', 'Da_thanh_toan', 0, 3),
(615000.00, 0.00, 'Chuyen_khoan', '2025-07-04', 'TXN004', 'Da_thanh_toan', 0, 4),
(615000.00, 0.00, 'The_tin_dung', '2025-07-05', 'TXN005', 'Da_thanh_toan', 0, 5),
-- IELTS exam fees
(5400000.00, 0.00, 'Chuyen_khoan', '2025-07-06', 'TXN006', 'Da_thanh_toan', 0, 6),
(5400000.00, 0.00, 'The_tin_dung', '2025-07-07', 'TXN007', 'Da_thanh_toan', 0, 7),
(5400000.00, 0.00, 'Chuyen_khoan', '2025-07-08', 'TXN008', 'Da_thanh_toan', 0, 8),
(5400000.00, 10.00, 'Tien_mat', '2025-07-09', 'TXN009', 'Da_thanh_toan', 0, 9),
-- SAT exam fees
(1350000.00, 0.00, 'Chuyen_khoan', '2025-07-10', 'TXN010', 'Da_thanh_toan', 0, 10),
(1350000.00, 0.00, 'The_tin_dung', '2025-07-11', 'TXN011', 'Da_thanh_toan', 0, 11),
(1350000.00, 0.00, 'Tien_mat', '2025-07-12', 'TXN012', 'Da_thanh_toan', 0, 12),
-- GRE exam fees
(5100000.00, 0.00, 'Chuyen_khoan', '2025-07-13', 'TXN013', 'Da_thanh_toan', 0, 13),
(5100000.00, 0.00, 'The_tin_dung', '2025-07-14', 'TXN014', 'Da_thanh_toan', 0, 14),
(5100000.00, 0.00, 'Chuyen_khoan', '2025-07-15', 'TXN015', 'Da_thanh_toan', 0, 15),
-- GMAT exam fees
(6750000.00, 0.00, 'Chuyen_khoan', '2025-07-16', 'TXN016', 'Da_thanh_toan', 0, 16),
(6750000.00, 0.00, 'The_tin_dung', '2025-07-17', 'TXN017', 'Da_thanh_toan', 0, 17),
-- Pending/cancelled payments
(615000.00, 0.00, 'Chuyen_khoan', '2025-07-18', 'TXN018', 'Chua_thanh_toan', 0, 18),
(5400000.00, 0.00, 'The_tin_dung', '2025-07-19', 'TXN019', 'Huy', 0, 19),
(1350000.00, 0.00, 'Tien_mat', '2025-07-20', 'TXN020', 'Chua_thanh_toan', 0, 20);
GO

-- Insert PhieuDuThi data (only for paid registrations)
INSERT INTO PhieuDuThi (SoBaoDanh, NgayPhatHanh, TrangThai, MaPhieuDangKy, MaThiSinh) VALUES
-- TOEIC exam tickets
('TOE25001', '2025-07-25', 'Da_thi', 1, 1),
('TOE25002', '2025-07-25', 'Da_thi', 2, 2),
('TOE25003', '2025-07-25', 'Da_thi', 3, 3),
('TOE25004', '2025-07-25', 'Da_thi', 4, 4),
('TOE25005', '2025-07-25', 'Da_thi', 5, 5),
-- IELTS exam tickets
('IEL25001', '2025-07-30', 'Da_thi', 6, 6),
('IEL25002', '2025-07-30', 'Da_thi', 7, 7),
('IEL25003', '2025-07-30', 'Da_thi', 8, 8),
('IEL25004', '2025-07-30', 'Da_thi', 9, 9),
-- SAT exam tickets
('SAT25001', '2025-08-05', 'Da_thi', 10, 10),
('SAT25002', '2025-08-05', 'Da_thi', 11, 11),
('SAT25003', '2025-08-05', 'Cho_thi', 12, 12),
-- GRE exam tickets
('GRE25001', '2025-08-10', 'Da_thi', 13, 13),
('GRE25002', '2025-08-10', 'Da_thi', 14, 14),
('GRE25003', '2025-08-10', 'Cho_thi', 15, 15),
-- GMAT exam tickets
('GMA25001', '2025-08-15', 'Da_thi', 16, 16),
('GMA25002', '2025-08-15', 'Cho_thi', 17, 17);
GO

-- Insert KetQuaThi data (only for completed exams)
INSERT INTO KetQuaThi (Diem, NgayCongBo, MaPhieuDuThi, MaDonViChamThi) VALUES
-- TOEIC results
(85.50, '2025-08-20', 1, 1),
(78.25, '2025-08-20', 2, 1),
(92.30, '2025-08-20', 3, 1),
(67.50, '2025-08-20', 4, 1),
(89.75, '2025-08-20', 5, 1),
-- IELTS results
(72.22, '2025-08-25', 6, 1),
(83.33, '2025-08-25', 7, 1),
(77.78, '2025-08-25', 8, 1),
(88.89, '2025-08-25', 9, 1),
-- SAT results
(79.17, '2025-08-30', 10, 2),
(85.42, '2025-08-30', 11, 2),
-- GRE results
(81.25, '2025-09-05', 13, 2),
(76.25, '2025-09-05', 14, 2),
-- GMAT results
(91.67, '2025-09-10', 16, 2);
GO

-- Insert ChungChi data (only for completed results)
INSERT INTO ChungChi (LoaiChungChi, NgayCap, NgayNhan, TrangThai, MaKetQua) VALUES
-- TOEIC certificates
('TOEIC', '2025-08-25', '2025-08-30', 'Da_nhan', 1),
('TOEIC', '2025-08-25', '2025-09-02', 'Da_nhan', 2),
('TOEIC', '2025-08-25', NULL, 'Da_cap', 3),
('TOEIC', '2025-08-25', '2025-09-05', 'Da_nhan', 4),
('TOEIC', '2025-08-25', NULL, 'Da_cap', 5),
-- IELTS certificates
('IELTS', '2025-08-30', '2025-09-08', 'Da_nhan', 6),
('IELTS', '2025-08-30', NULL, 'Da_cap', 7),
('IELTS', '2025-08-30', '2025-09-10', 'Da_nhan', 8),
('IELTS', '2025-08-30', NULL, 'Da_cap', 9),
-- SAT certificates
('SAT', '2025-09-05', '2025-09-12', 'Da_nhan', 10),
('SAT', '2025-09-05', NULL, 'Da_cap', 11),
-- GRE certificates
('GRE', '2025-09-10', '2025-09-15', 'Da_nhan', 12),
('GRE', '2025-09-10', NULL, 'Da_cap', 13),
-- GMAT certificate
('GMAT', '2025-09-15', '2025-09-20', 'Da_nhan', 14);
GO

-- Insert YeuCauGiaHan data (only for valid exam tickets)
INSERT INTO YeuCauGiaHan (LyDo, BangChung, PhiGiaHan, SoLanDaGiaHan, NgayYeuCau, TrangThai, MaPhieuDuThi, MaNhanVien, MaDanhSachCho) VALUES
(N'Bệnh nặng không thể tham gia thi theo lịch đã đăng ký', 'https://res.cloudinary.com/dvzhmi7a9/image/upload/v1752205277/giay-chung-nhan-benh_gmbnm5.png', 200000.00, 0, '2025-08-01', 'Da_duyet', 12, 1, 1),
(N'Công tác đột xuất của công ty không thể sắp xếp lại', 'https://res.cloudinary.com/dvzhmi7a9/image/upload/v1752205275/lenh-cong-tac_u6ywx4.png', 150000.00, 0, '2025-08-05', 'Da_duyet', 15, 1, 2),
(N'Visa bị trễ không thể về nước thi đúng lịch', N'Scan hộ chiếu và thông báo từ lãnh sự quán', 300000.00, 0, '2025-08-10', 'Cho_duyet', 17, 1, 3);
GO

-- Insert LichThi_NhanVienCoiThi data (many-to-many relationship)
INSERT INTO LichThi_NhanVienCoiThi (MaLichThi, MaNhanVienCoiThi) VALUES
-- TOEIC exam proctors
(1, 5), (1, 6), (1, 7),
-- IELTS exam proctors
(2, 5), (2, 6),
-- SAT exam proctors
(3, 5), (3, 7),
-- GRE exam proctors
(4, 6), (4, 7),
-- GMAT exam proctors
(5, 5), (5, 6);
GO

PRINT 'Additional sample data with multiple certificates per student inserted successfully!';
GO