const db = require('../common/connect')
const moment = require('moment')

const ThietBiNhap = function (thietBiNhap) {
    this.maThietBi = thietBiNhap.maThietBi;
    this.tenThietBi = thietBiNhap.tenThietBi;
    this.soLuongNhap = thietBiNhap.soLuongNhap;
    this.trangThai = thietBiNhap.trangThai;
}
//lấy dữ liệu để thống kê nhập 
ThietBiNhap.getSLThietBiimported = function (tuNgay, denNgay, result) {

    if (moment(tuNgay, 'YYYY-MM-DD', true).isValid() && moment(denNgay, 'YYYY-MM-DD', true).isValid()) {
        db.query("select  ChiTietPhieuNhap.maThietBi,ThietBi.tenThietBi,sum(ChiTietPhieuNhap.soLuongNhap) as soLuongNhap, ChiTietPhieuNhap.trangThai " +
            "from PhieuNhap right join ChiTietPhieuNhap " +
            "on PhieuNhap.maPN = ChiTietPhieuNhap.maPN " +
            "left join ThietBi " +
            "on ChiTietPhieuNhap.maThietBi = ThietBi.maThietBi " +
            "where PhieuNhap.ngayNhap BETWEEN ? AND ? " +
            "group by  ChiTietPhieuNhap.maThietBi,ThietBi.tenThietBi, ChiTietPhieuNhap.trangThai ",[tuNgay, denNgay], function (err, thietBiNhap) {
                if (err) {
                    console.log(err)
                    result(err, null);
                } else {
                    result(null, thietBiNhap);
                }
            });
    } else {
        result("Ngày không hợp lệ", null);
    }
};
module.exports = ThietBiNhap;