
module.exports = function(router){
    var thietBiController = require('../controllers/thietBi.controller');

    router.get('/thietBi/list', thietBiController.get_list);
    router.get('/thietBi/detail/:name', thietBiController.getByName);
    router.get('/thietBi/filter/:maNCC', thietBiController.getByMaNCC);
    router.get('/thietBi/trang-thai/:trangThai', thietBiController.getByStatus);
    router.get('/thietBi/search-danhmuc-trangthai/:maNCC/:trangThai', thietBiController.getByStatusAndNCC);

}