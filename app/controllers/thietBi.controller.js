
var ThietBi = require('../models/thietbi.model')

//Lấy tất cả thiết bị
exports.get_list = function(req, res){
    ThietBi.getAll(function(data){
        res.send({result:data});
    });
};


//Tìm thiết bị theo tên
exports.getByName = function(req, res) {
    const name = req.params.name; // Lấy tên thiết bị từ URL parameter
    
    ThietBi.getByName(name, function(data) {
      res.send({ result: data });
    });
  };

//Tìm thiết bị bởi mã nhà cung cấp
exports.getByMaNCC = function(req, res){
  const maNCC = req.params.maNCC; // Lấy tên thiết bị từ URL parameter
    
    ThietBi.getByMaNCC(maNCC, function(data){
      res.send({result:data});
    });
}

//Tìm thiết bị theo trạng thái
exports.getByStatus = function(req, res){
  const status = req.params.trangThai; // Lấy tên thiết bị từ URL parameter  
  ThietBi.getByStatus(status, function(data){
    res.send({result:data});
  });
}

//Tìm thiết bị theo mã nhà cung cấp và trạng thái
exports.getByStatusAndNCC = function(req, res) {
  const status = req.params.trangThai; 
  const maNCC = req.params.maNCC; // Lấy mã nhà cung cấp từ URL parameter
  ThietBi.getByNCC_status(maNCC, status, function(data) {
    res.send({ result: data });
  });
};

  