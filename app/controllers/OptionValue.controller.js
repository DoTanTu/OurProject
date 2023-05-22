var OptionValue = require('../models/OptionValue.model');

//------------------------------------------------NHÂN VIÊN XUẤT-----------------------------------------------------// 
exports.get_list_nhanvienxuat = function(req, res){
    OptionValue.NhanVien.getAllNhanVienXuat(function(data){
        res.send({result:data});
    });
};

//-------------------------------------------------NHÂN VIÊN NHẬN-----------------------------------------------------// 
exports.get_list_nhanviennhan = function(req, res){
    OptionValue.NhanVien.getAllNhanVienNhan(function(data){
        res.send({result:data});
    });
};

//---------------------------------------------------MÃ THIẾT BỊ-----------------------------------------------------// 
exports.get_matb = function(req, res){
    OptionValue.MaThietBi.getMaThietBi(function(data){
        res.send({result:data});
    });
};

//---------------------------------------------------MÃ PHIẾU XUẤT-----------------------------------------------------// 
exports.get_mapx = function(req, res){
    OptionValue.MaPX.getMaPX(function(data){
        res.send({result:data});
    });
};

//---------------------------------------------------LOẠI THIẾT BỊ-----------------------------------------------------// 
exports.get_list_loaithietbi = function(req, res){
    OptionValue.LoaiTB.getAllLoaiTB(function(data){
        res.send({result:data});
    });
};

//---------------------------------------------------DANH SÁCH KHOA-----------------------------------------------------// 
exports.get_list_khoa = function(req, res){
    OptionValue.Khoa.getAllKhoa(function(data){
        res.send({result:data});
    });
};
