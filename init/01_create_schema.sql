-- Hệ thống quản lý thi chứng chỉ - MS SQL Server Schema

USE master;
GO

-- Tạo database nếu chưa tồn tại
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'examination_management')
BEGIN
    CREATE DATABASE examination_management;
END
GO

USE examination_management;
GO

-- Xóa các bảng nếu đã tồn tại (theo thứ tự ngược lại để tránh lỗi khóa ngoại)
IF OBJECT_ID('LichThi_NhanVienCoiThi', 'U') IS NOT NULL DROP TABLE LichThi_NhanVienCoiThi;
IF OBJECT_ID('YeuCauGiaHan', 'U') IS NOT NULL DROP TABLE YeuCauGiaHan;
IF OBJECT_ID('ChungChi', 'U') IS NOT NULL DROP TABLE ChungChi;
IF OBJECT_ID('KetQuaThi', 'U') IS NOT NULL DROP TABLE KetQuaThi;
IF OBJECT_ID('PhieuDuThi', 'U') IS NOT NULL DROP TABLE PhieuDuThi;
IF OBJECT_ID('HoaDon', 'U') IS NOT NULL DROP TABLE HoaDon;
IF OBJECT_ID('ThiSinh', 'U') IS NOT NULL DROP TABLE ThiSinh;
IF OBJECT_ID('PhieuDangKy', 'U') IS NOT NULL DROP TABLE PhieuDangKy;
IF OBJECT_ID('PhongThi', 'U') IS NOT NULL DROP TABLE PhongThi;
IF OBJECT_ID('LichThi', 'U') IS NOT NULL DROP TABLE LichThi;
IF OBJECT_ID('DanhSachCho', 'U') IS NOT NULL DROP TABLE DanhSachCho;
IF OBJECT_ID('DonViChamThi', 'U') IS NOT NULL DROP TABLE DonViChamThi;
IF OBJECT_ID('NhanVien', 'U') IS NOT NULL DROP TABLE NhanVien;
IF OBJECT_ID('KhachHang', 'U') IS NOT NULL DROP TABLE KhachHang;
GO

-- Tạo bảng KhachHang
CREATE TABLE KhachHang (
    MaKhachHang INT IDENTITY(1,1) PRIMARY KEY,
    Ten NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    DiaChi NTEXT,
    SDT NVARCHAR(15),
    NgaySinh DATE,
    CCCD NVARCHAR(12) UNIQUE,
    LoaiKhachHang NVARCHAR(20) DEFAULT 'Tu_do' CHECK (LoaiKhachHang IN ('Tu_do', 'Don_vi'))
);
GO

-- Tạo bảng NhanVien
CREATE TABLE NhanVien (
    MaNhanVien INT IDENTITY(1,1) PRIMARY KEY,
    VaiTro NVARCHAR(30) NOT NULL CHECK (VaiTro IN ('Quan_ly', 'Nhan_vien_tiep_nhan', 'Nhan_vien_cham_thi', 'Nhan_vien_coi_thi')),
    HoTen NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    SDT NVARCHAR(15)
);
GO

-- Tạo bảng DonViChamThi
CREATE TABLE DonViChamThi (
    MaDonViChamThi INT IDENTITY(1,1) PRIMARY KEY,
    TenDonViChamThi NVARCHAR(200) NOT NULL,
    ThongTinLienLac NTEXT
);
GO

-- Tạo bảng DanhSachCho
CREATE TABLE DanhSachCho (
    MaDanhSachCho INT IDENTITY(1,1) PRIMARY KEY,
    NgayGiaHan DATETIME NOT NULL,
    SoLuong INT NOT NULL DEFAULT 0
);
GO

-- Tạo bảng LichThi
CREATE TABLE LichThi (
    MaLichThi INT IDENTITY(1,1) PRIMARY KEY,
    TenLichThi NVARCHAR(200) NOT NULL,
    ThoiGianThi DATETIME NOT NULL,
    SoLuongDaDangKi INT DEFAULT 0,
    SoLuongToiThieu INT NOT NULL,
    SoLuongToiDa INT NOT NULL,
    CONSTRAINT CHK_LichThi_SoLuong CHECK (SoLuongToiThieu <= SoLuongToiDa)
);
GO

-- Tạo bảng PhongThi
CREATE TABLE PhongThi (
    MaPhong INT IDENTITY(1,1) PRIMARY KEY,
    TenPhong NVARCHAR(100) NOT NULL,
    SucChua INT NOT NULL CHECK (SucChua > 0),
    DiaDiem NVARCHAR(200) NOT NULL,
    MaLichThi INT,
    FOREIGN KEY (MaLichThi) REFERENCES LichThi(MaLichThi)
);
GO

-- Tạo bảng PhieuDangKy
CREATE TABLE PhieuDangKy (
    MaPhieuDangKy INT IDENTITY(1,1) PRIMARY KEY,
    LoaiKiThi NVARCHAR(5) NOT NULL CHECK (LoaiKiThi IN ('TOEIC', 'IELTS', 'SAT', 'GRE', 'GMAT')),
    NgayDangKy DATE NOT NULL,
    TrangThai NVARCHAR(20) DEFAULT 'Cho_duyet' CHECK (TrangThai IN ('Cho_duyet', 'Da_duyet', 'Tu_choi', 'Hoan_thanh')),
    MaKhachHang INT NOT NULL,
    MaLichThi INT NOT NULL,
    MaNhanVien INT,
    FOREIGN KEY (MaKhachHang) REFERENCES KhachHang(MaKhachHang),
    FOREIGN KEY (MaLichThi) REFERENCES LichThi(MaLichThi),
    FOREIGN KEY (MaNhanVien) REFERENCES NhanVien(MaNhanVien)
);
GO

-- Tạo bảng ThiSinh
CREATE TABLE ThiSinh (
    MaThiSinh INT IDENTITY(1,1) PRIMARY KEY,
    Ten NVARCHAR(100) NOT NULL,
    NgaySinh DATE NOT NULL,
    CCCD NVARCHAR(12) UNIQUE NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    MaKhachHang INT NOT NULL,
    MaPhieuDangKy INT NOT NULL UNIQUE,
    FOREIGN KEY (MaKhachHang) REFERENCES KhachHang(MaKhachHang),
    FOREIGN KEY (MaPhieuDangKy) REFERENCES PhieuDangKy(MaPhieuDangKy)
);
GO

-- Tạo bảng HoaDon
CREATE TABLE HoaDon (
    MaHoaDon INT IDENTITY(1,1) PRIMARY KEY,
    SoTien DECIMAL(15,2) NOT NULL CHECK (SoTien >= 0),
    MucGiamGia DECIMAL(5,2) DEFAULT 0 CHECK (MucGiamGia >= 0 AND MucGiamGia <= 100),
    HinhThucThanhToan NVARCHAR(20) NOT NULL CHECK (HinhThucThanhToan IN ('Tien_mat', 'Chuyen_khoan', 'The_tin_dung')),
    NgayThanhToan DATE NOT NULL,
    MaThanhToan NVARCHAR(50),
    TrangThai NVARCHAR(20) DEFAULT 'Chua_thanh_toan' CHECK (TrangThai IN ('Chua_thanh_toan', 'Da_thanh_toan', 'Huy')),
    GiaHan BIT DEFAULT 0,
    MaPhieuDangKy INT NOT NULL,
    FOREIGN KEY (MaPhieuDangKy) REFERENCES PhieuDangKy(MaPhieuDangKy)
);
GO

-- Tạo bảng PhieuDuThi
CREATE TABLE PhieuDuThi (
    MaPhieuDuThi INT IDENTITY(1,1) PRIMARY KEY,
    SoBaoDanh NVARCHAR(20) UNIQUE NOT NULL,
    NgayPhatHanh DATE NOT NULL,
    TrangThai NVARCHAR(20) DEFAULT 'Cho_thi' CHECK (TrangThai IN ('Cho_thi', 'Da_thi', 'Khong_hop_le')),
    MaPhieuDangKy INT NOT NULL,
    MaThiSinh INT NOT NULL,
    FOREIGN KEY (MaPhieuDangKy) REFERENCES PhieuDangKy(MaPhieuDangKy),
    FOREIGN KEY (MaThiSinh) REFERENCES ThiSinh(MaThiSinh)
);
GO

-- Tạo bảng KetQuaThi
CREATE TABLE KetQuaThi (
    MaKetQua INT IDENTITY(1,1) PRIMARY KEY,
    Diem DECIMAL(4,2) NOT NULL CHECK (Diem >= 0 AND Diem <= 100),
    NgayCongBo DATE,
    MaPhieuDuThi INT NOT NULL,
    MaDonViChamThi INT NOT NULL,
    FOREIGN KEY (MaPhieuDuThi) REFERENCES PhieuDuThi(MaPhieuDuThi),
    FOREIGN KEY (MaDonViChamThi) REFERENCES DonViChamThi(MaDonViChamThi)
);
GO

-- Tạo bảng ChungChi
CREATE TABLE ChungChi (
    MaChungChi INT IDENTITY(1,1) PRIMARY KEY,
    LoaiChungChi NVARCHAR(5) NOT NULL CHECK (LoaiChungChi IN ('TOEIC', 'IELTS', 'SAT', 'GRE', 'GMAT')),
    NgayCap DATE NOT NULL,
    NgayNhan DATE,
    TrangThai NVARCHAR(20) DEFAULT 'Da_cap' CHECK (TrangThai IN ('Da_cap', 'Da_nhan', 'Bi_thu_hoi')),
    MaKetQua INT NOT NULL,
    FOREIGN KEY (MaKetQua) REFERENCES KetQuaThi(MaKetQua)
);
GO

-- Tạo bảng YeuCauGiaHan
CREATE TABLE YeuCauGiaHan (
    MaYeuCau INT IDENTITY(1,1) PRIMARY KEY,
    LyDo NTEXT NOT NULL,
    BangChung NTEXT,
    PhiGiaHan DECIMAL(10,2) NOT NULL CHECK (PhiGiaHan >= 0),
    SoLanDaGiaHan INT DEFAULT 0 CHECK (SoLanDaGiaHan >= 0),
    NgayYeuCau DATE NOT NULL,
    TrangThai NVARCHAR(20) DEFAULT 'Cho_duyet' CHECK (TrangThai IN ('Cho_duyet', 'Da_duyet', 'Tu_choi')),
    MaPhieuDuThi INT NOT NULL,
    MaNhanVien INT,
    MaDanhSachCho INT,
    FOREIGN KEY (MaPhieuDuThi) REFERENCES PhieuDuThi(MaPhieuDuThi),
    FOREIGN KEY (MaNhanVien) REFERENCES NhanVien(MaNhanVien),
    FOREIGN KEY (MaDanhSachCho) REFERENCES DanhSachCho(MaDanhSachCho)
);
GO

-- Tạo bảng quan hệ nhiều-nhiều LichThi_NhanVienCoiThi
CREATE TABLE LichThi_NhanVienCoiThi (
    MaLichThi INT,
    MaNhanVienCoiThi INT,
    PRIMARY KEY (MaLichThi, MaNhanVienCoiThi),
    FOREIGN KEY (MaLichThi) REFERENCES LichThi(MaLichThi),
    FOREIGN KEY (MaNhanVienCoiThi) REFERENCES NhanVien(MaNhanVien)
);
GO

-- Tạo các chỉ mục để tối ưu hiệu suất
CREATE NONCLUSTERED INDEX IX_ThiSinh_CCCD ON ThiSinh(CCCD);
CREATE NONCLUSTERED INDEX IX_KhachHang_CCCD ON KhachHang(CCCD);
CREATE NONCLUSTERED INDEX IX_KhachHang_Email ON KhachHang(Email);
CREATE NONCLUSTERED INDEX IX_NhanVien_Email ON NhanVien(Email);
CREATE NONCLUSTERED INDEX IX_PhieuDangKy_KhachHang ON PhieuDangKy(MaKhachHang);
CREATE NONCLUSTERED INDEX IX_PhieuDangKy_LichThi ON PhieuDangKy(MaLichThi);
CREATE NONCLUSTERED INDEX IX_PhieuDangKy_TrangThai ON PhieuDangKy(TrangThai);
CREATE NONCLUSTERED INDEX IX_LichThi_ThoiGianThi ON LichThi(ThoiGianThi);
CREATE NONCLUSTERED INDEX IX_HoaDon_TrangThai ON HoaDon(TrangThai);
CREATE NONCLUSTERED INDEX IX_PhieuDuThi_SoBaoDanh ON PhieuDuThi(SoBaoDanh);
CREATE NONCLUSTERED INDEX IX_KetQuaThi_PhieuDuThi ON KetQuaThi(MaPhieuDuThi);
CREATE NONCLUSTERED INDEX IX_ChungChi_KetQua ON ChungChi(MaKetQua);
CREATE NONCLUSTERED INDEX IX_YeuCauGiaHan_PhieuDuThi ON YeuCauGiaHan(MaPhieuDuThi);
CREATE NONCLUSTERED INDEX IX_YeuCauGiaHan_TrangThai ON YeuCauGiaHan(TrangThai);
GO

PRINT 'Schema created successfully!';
GO