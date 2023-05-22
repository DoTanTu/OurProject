const LoaiTBHelper = require('../models/LoaiTBHelper.model')

exports.get_list = function(req, res){
    LoaiTBHelper.get_all(function(data){
        res.send({result:data});
    });
};