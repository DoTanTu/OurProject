const db = require('../common/connect');
const moment = require('moment')

const ThietBiXuat = function (thietBiXuat) {
    this.maThietBi = thietBiXuat.maThietBi;
    this.tenThietBi = thietBiXuat.tenThietBi;
    this.soLuongXuat = thietBiXuat.soLuongXuat;
    this.trangThai = thietBiXuat.trangThai;

}
//lấy dữ liệu để thống kê xuất 
ThietBiXuat.getSLThietBiexported = function (tuNgay, denNgay, result) {

    if (moment(tuNgay, 'YYYY-MM-DD', true).isValid() && moment(denNgay, 'YYYY-MM-DD', true).isValid()) {
        db.query("select  ChiTietThietBiXuat.maThietBi,ThietBi.tenThietBi,sum(ChiTietThietBiXuat.soLuong) as soLuongXuat, ChiTietThietBiXuat.trangThai " +
            "from PhieuXuat right join ChiTietThietBiXuat " +
            "on PhieuXuat.maPX = ChiTietThietBiXuat.maPX " +
            "left join ThietBi " +
            "on ChiTietThietBiXuat.maThietBi = ThietBi.maThietBi " +
            "where ChiTietThietBiXuat.trangThai= N'Đã xuất' and PhieuXuat.ngayXuat BETWEEN ? AND ? " +
            "group by  ChiTietThietBiXuat.maThietBi,ThietBi.tenThietBi, ChiTietThietBiXuat.trangThai ", [tuNgay, denNgay], function (err, thietBiXuat) {
                if (err) {
                    console.log(err)
                    result(err, null);
                } else {
                    result(null, thietBiXuat);
                }
            });
    } else {
        result("Ngày không hợp lệ", null);
    }
};



module.exports = ThietBiXuat;