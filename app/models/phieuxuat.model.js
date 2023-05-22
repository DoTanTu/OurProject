const db = require('../common/connect')
const PhieuXuat = function(phieuxuat){
    this.maPX = phieuxuat.maPX;
    this.ngayXuat = phieuxuat.ngayXuat;
    this.nhanVienXuat = phieuxuat.nhanVienXuat;
    this.nhanVienNhan = phieuxuat.nhanVienNhan;
    this.khoaSuDung = phieuxuat.khoaSuDung;
}

//---------------------------------------------------LẤY DANH SÁCH PHIẾU XUẤT----------------------------------------------//
PhieuXuat.getAll = function(result){
    db.query("SELECT PX.maPX , PX.ngayXuat , NVX.tenTaiKhoan AS nhanVienXuat, NVN.tenTaiKhoan AS nhanVienNhan, K.tenKhoa AS khoaSuDung FROM PhieuXuat PX INNER JOIN TaiKhoan NVX ON PX.nhanVienXuat = NVX.maTaiKhoan INNER JOIN TaiKhoan NVN ON PX.nhanVienNhan = NVN.maTaiKhoan INNER JOIN Khoa K ON NVN.maKhoa = K.maKhoa;", function(err,phieuxuat){
        if (err)
            result(null);
        else {
            result(phieuxuat);
        }
    });
};

//------------------------------------------------LẤY CHI TIẾT PHIẾU XUẤT THEO ID-----------------------------------------//
PhieuXuat.getByID = function(maPX,result){
    db.query("SELECT CT.maThietBi, TB.tenThietBi, TB.loaiThietBi, CT.soLuong, TB.donVi, CT.trangThai, CT.ghiChu FROM ChiTietThietBiXuat AS CT JOIN ThietBi AS TB ON CT.maThietBi = TB.maThietBi WHERE maPX = ?",maPX,function(err,phieuxuat){
            if(err || phieuxuat.length==0){
                result(null)
            }
            else{
            result(phieuxuat);
            }
    })
}
module.exports = PhieuXuat;