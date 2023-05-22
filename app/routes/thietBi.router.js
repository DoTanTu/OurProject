const { validateSchema, updateSchema,addSchema,deleteSchema } = require('./schemas.yup');

module.exports = function(router){
    var ThietbiController = require('../controllers/Thietbi.controller');

    router.get('/thietbi/list', ThietbiController.get_list);

    router.post('/thietbi/add',validateSchema(addSchema) ,ThietbiController.add_product);

    router.patch('/thietbi/update/:id',validateSchema(updateSchema), ThietbiController.update_product);
    
    router.delete('/thietbi/delete/:id', ThietbiController.delete_product);
    

}
