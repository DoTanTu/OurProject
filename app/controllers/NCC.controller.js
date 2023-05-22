const nccHelper = require('../models/NCCHelper.model')

exports.get_list = function(req, res){
    nccHelper.get_all(function(data){
        res.send({result:data});
    });
};