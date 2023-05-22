const db = require('../common/connect');

const OptionValue = {};

OptionValue.Khoa = function(khoa){
    this.maKhoa = khoa.maKhoa;
    this.tenKhoa = khoa.tenKhoa;
};

OptionValue.LoaiTB = function(loaitb){
    this.maLoaiTB = loaitb.maLoaiTB;
    this.tenLoaiTB = loaitb.tenLoaiTB;
};

OptionValue.MaPX = function(mapx){
    this.maPX = mapx.maPX;
};

OptionValue.MaThietBi = function(matb){
    this.maThietBi = matb.maThietBi;
};

OptionValue.NhanVien = function(nhanvien){
    this.maTaiKhoan = nhanvien.maTaiKhoan;
    this.tenTaiKhoan = nhanvien.tenTaiKhoan;
};

//------------------------------------------------------LẤY THÔNG TIN TẤT CẢ KHOA-----------------------------------------//
OptionValue.Khoa.getAllKhoa = function(result){
    db.query("SELECT * FROM khoa", function(err, khoa){
        if (err)
            result(null);
        else {
            result(khoa);
        }
    });
};

//--------------------------------------------------LẤY THÔNG TIN TẤT CẢ LOẠI THIẾT BỊ-----------------------------------------//
OptionValue.LoaiTB.getAllLoaiTB = function(result){
    db.query("SELECT * FROM LoaiThietBi", function(err, loaitb){
        if (err)
            result(null);
        else {
            result(loaitb);
        }
    });
};

//------------------------------------------------------LẤY  MÃ PHIẾU XUẤT MỚI NHẤT-----------------------------------------//
OptionValue.MaPX.getMaPX = function(result){
    db.query("SELECT CONCAT('PX', LPAD(SUBSTRING(maPX, 3) + 1, LENGTH(maPX) - 2, '0')) AS maPX FROM PhieuXuat ORDER BY maPX DESC LIMIT 1;", function(err, mapx){
        if (err)
            result(null);
        else {
            result(mapx);
        }
    });
};

//--------------------------------------------------------LẤY MÃ THIẾT BỊ MỚI NHẤT-----------------------------------------//
OptionValue.MaThietBi.getMaThietBi = function(result){
    db.query("SELECT maThietBi FROM ThietBi ORDER BY maThietBi ASC;", function(err, matb){
        if (err)
            result(null);
        else {
            result(matb);
        }
    });
};

//------------------------------------------------------LẤY DANH SÁCH NHÂN VIÊN XUẤT-----------------------------------------//
OptionValue.NhanVien.getAllNhanVienXuat = function(result){
    db.query("SELECT maTaiKhoan, tenTaiKhoan FROM TaiKhoan WHERE phongBan = 'Phong Nhan Su'", function(err, nhanvien){
        if (err)
            result(null);
        else {
            result(nhanvien);
        }
    });
};

//------------------------------------------------------LẤY DANH SÁCH NHÂN VIÊN NHẬN-----------------------------------------//
OptionValue.NhanVien.getAllNhanVienNhan = function(result){
    db.query("SELECT maTaiKhoan, tenTaiKhoan FROM TaiKhoan WHERE phongBan <> 'Phong Nhan Su'", function(err, nhanvien){
        if (err)
            result(null);
        else {
            result(nhanvien);
        }
    });
};

module.exports = OptionValue;
