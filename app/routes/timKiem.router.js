
module.exports = function(router){

    var thietBiController = require('../controllers/timKiem.controller');
    var reportthietBiXuatController = require('../controllers/report_thietBiXuat.controller')
    var reportthietBiNhapController = require('../controllers/report_thietBiNhap.controller');

    router.get('/thietBi/tat-ca', thietBiController.get_list);

    router.get('/thietBi/tim-kiem-ten/:name', thietBiController.getByName);

    router.get('/thietBi/tim-kiem-NCC/:maNCC', thietBiController.getByMaNCC);

    router.get('/thietBi/tim-kiem-status/:trangThai', thietBiController.getByStatus);

    router.get('/thietBi/tim-kiem-soLuong/:soLuong1/:soLuong2', thietBiController.getByQuantity);
    
    router.get('/thietBi/tim-kiem-date/:dateStart/:dateEnd', thietBiController.getByDate);

    router.get('/thietBi/tim-kiem-NCC-status/:maNCC/:trangThai', thietBiController.getByStatusAndNCC);

    router.get('/thietBi/tim-kiem-NCC-date/:maNCC/:dateStart/:dateEnd', thietBiController.getByNhaCungCapAndDate);

    router.get('/thietBi/tim-kiem-NCC-SL/:maNCC/:soLuong1/:soLuong2', thietBiController.getByNhaCungCapAndSoLuong);

    router.get('/thietBi/tim-kiem-SL-Date/:soLuong1/:soLuong2/:dateStart/:dateEnd', thietBiController.getBySoLuongAndDate);

    router.get('/thietBi/tim-kiem-SL-status/:soLuong1/:soLuong2/:trangThai', thietBiController.getBySoLuongAndTrangThai);

    router.get('/thietBi/tim-kiem-status-Date/:trangThai/:dateStart/:dateEnd', thietBiController.getByStatusAndDate);

    router.get('/thietBi/tim-kiem-SL-status-Date/:soLuong1/:soLuong2/:trangThai/:dateStart/:dateEnd', thietBiController.getBySoLuong_TrangThai_Date);

    router.get('/thietBi/tim-kiem-NCC-status-Date/:maNCC/:trangThai/:dateStart/:dateEnd', thietBiController.getByNCC_status_dateRange);
    router.get('/thietBi/tim-kiem-NCC-status-SL/:maNCC/:trangThai/:soLuong1/:soLuong2', thietBiController.getByNhaCungCap_TrangThai_SoLuong);
    router.get('/thietBi/tim-kiem-NCC-status-SL-Date/:maNCC/:trangThai/:soLuong1/:soLuong2/:dateStart/:dateEnd', thietBiController.getByNhaCungCap_TrangThai_SoLuong_Date);

    //Report
    router.get('/thietBi/report/:soLuong', thietBiController.getBysoLuongHC);
    router.get('/thietBiXuat/reportsothietbixuat/:tuNgay/:denNgay', reportthietBiXuatController.get_SoLuongThietBiXuat_trongktg);
    router.get('/thietBiNhap/reportsothietbinhap/:tuNgay/:denNgay', reportthietBiNhapController.get_SoLuongThietBiNhap_trongktg);

}