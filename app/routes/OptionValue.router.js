module.exports = function(router) {
    var optionValueController = require('../controllers/optionvalue.controller');
  
    router.get('/nhanvien/listnvxuat', optionValueController.get_list_nhanvienxuat);
    router.get('/nhanvien/listnvnhan', optionValueController.get_list_nhanviennhan);
    router.get('/matb/list', optionValueController.get_matb);
    router.get('/mapx/list', optionValueController.get_mapx);
    router.get('/loaitb/list', optionValueController.get_list_loaithietbi);
    router.get('/khoa/list', optionValueController.get_list_khoa);
  };
  