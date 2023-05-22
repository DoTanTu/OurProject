module.exports = function(router){
    var phieuxuatController = require('../controllers/phieuxuat.controller');

    router.get('/phieuxuat/list', phieuxuatController.get_list);
    router.get('/phieuxuat/dsthietbi/:maPX', phieuxuatController.get_thietbiById);
}