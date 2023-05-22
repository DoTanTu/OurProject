var PhieuXuat = require('../models/phieuxuat.model')

//-------------------------------------------------LẤY TẤT CẢ DANH SÁCH THIẾT BỊ-------------------------------------//
exports.get_list = function(req, res){
    PhieuXuat.getAll(function(data){
        res.send({result:data});
    });
};


//-----------------------------------------------------XUẤT THIẾT BỊ THEO ID-------------------------------------//
exports.get_thietbiById = function(req, res){
    const maPX = req.params.maPX;
    PhieuXuat.getByID(maPX, function(data){
        res.send({result:data});
    });
};
