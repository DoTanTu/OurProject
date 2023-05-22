module.exports = function(router){
    var NCCController = require('../controllers/NCC.controller');

    router.get('/NCC/list', NCCController.get_list);
}