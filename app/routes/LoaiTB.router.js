module.exports = function(router){
    var LoaiTBController = require('../controllers/LoaiTB.controller');

    router.get('/LoaiTB/list', LoaiTBController.get_list);
}