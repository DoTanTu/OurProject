
var ThietBi = require('../models/timKiem.model')

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

//---------------------------------------------------------TÌM THEO KHOẢN SỐ LƯỢNG-----------------------------------------------------//
exports.getByQuantity = function(req, res){
  const soLuong1 = req.params.soLuong1; 
  const soLuong2 = req.params.soLuong2; 
  ThietBi.getBySearchQuantity(soLuong1, soLuong2, function(data){
    res.send({result:data});
  });
}

//------------------------------------------------------------TÌM THEO TRẠNG THÁI-----------------------------------------------------//
exports.getByStatus = function(req, res){
  const status = req.params.trangThai; 
  ThietBi.getByStatus(status, function(data){
    res.send({result:data});
  });
}

//---------------------------------------------------------TÌM THEO KHOẢN THỜI GIAN-----------------------------------------------------//
exports.getByDate = function(req, res) {
  const dateStart = req.params.dateStart;
  const dateEnd = req.params.dateEnd;
  ThietBi.getByDate(dateStart, dateEnd, function(data) {
    res.send({ result: data });
  });
};

//----------------------------------------------------TÌM THEO NHÀ CUNG CẤP VÀ TRẠNG THÁI-----------------------------------------------------//
exports.getByStatusAndNCC = function(req, res) {
  const status = req.params.trangThai; 
  const maNCC = req.params.maNCC;
  ThietBi.getByNCC_status(maNCC, status, function(data) {
    res.send({ result: data });
  });
};

//----------------------------------------------------TÌM THEO NHÀ CUNG CẤP VÀ SỐ LƯỢNG-----------------------------------------------------//
exports.getByNhaCungCapAndSoLuong = function(req, res) {
  const maNCC = req.params.maNCC;
  const soLuong1 = req.params.soLuong1;
  const soLuong2 = req.params.soLuong2;
  ThietBi.getByNhaCungCapAndSoLuong(maNCC, soLuong1, soLuong2, function(data) {
    res.send({ result: data });
  });
};

//----------------------------------------------------TÌM THEO NHÀ CUNG CẤP - KHOẢN THỜI GIAN-----------------------------------------------------//
exports.getByNhaCungCapAndDate = function(req, res) {
  const maNCC = req.params.maNCC;
  const dateStart = req.params.dateStart;
  const dateEnd = req.params.dateEnd;
  ThietBi.getByNhaCungCapAnDate(maNCC,dateStart, dateEnd, function(data) {
    res.send({ result: data });
  });
};

//----------------------------------------------------TÌM THEO SỐ LƯỢNG - TRẠNG THÁI-----------------------------------------------------//
exports.getBySoLuongAndTrangThai = function(req, res) {
  const soLuong1 = req.params.soLuong1;
  const soLuong2 = req.params.soLuong2;
  const status = req.params.status;
  ThietBi.getBySoLuongAndTrangThai(soLuong1, soLuong2, status, function(data) {
    res.send({ result: data });
  });
};

//----------------------------------------------------TÌM THEO SỐ LƯỢNG - KHOẢN THỜI GIAN-----------------------------------------------------//
exports.getBySoLuongAndDate = function(req, res) {
  const soLuong1 = req.params.soLuong1;
  const soLuong2 = req.params.soLuong2;
  const dateStart = req.params.dateStart;
  const dateEnd = req.params.dateEnd;
  ThietBi.getBySoLuongAndDate(soLuong1, soLuong2, dateStart, dateEnd, function(data) {
    res.send({ result: data });
  });
};

//----------------------------------------------------TÌM THEO TRẠNG THÁI - THỜI GIAN-----------------------------------------------------//
exports.getByStatusAndDate = function(req, res) {
  const status = req.params.trangThai;
  const dateStart = req.params.dateStart;
  const dateEnd = req.params.dateEnd;
  ThietBi.getByStatusAndDate(status, dateStart, dateEnd, function(data) {
    res.send({ result: data });
  });
};

//-----------------------------------------------TÌM THEO NHÀ CUNG CẤP - TRẠNG THÁI - KHOẢN THỜI GIAN-----------------------------------------------------//
exports.getByNCC_status_dateRange = function(req, res) {
  const dateStart = req.params.dateStart;
  const dateEnd = req.params.dateEnd;
  const status = req.params.trangThai; 
  const maNCC = req.params.maNCC; // Lấy mã nhà cung cấp từ URL parameter
  ThietBi.getByNCC_status_dateRange(maNCC, status, dateStart, dateEnd, function(data) {
    res.send({ result: data });
  });
};

//-----------------------------------------------TÌM THEO NHÀ CUNG CẤP - TRẠNG THÁI - SỐ LƯỢNG-----------------------------------------------------//
exports.getByNhaCungCap_TrangThai_SoLuong = function(req, res) {
  const maNCC = req.params.maNCC;
  const status = req.params.trangThai;
  const soLuong1 = req.params.soLuong1;
  const soLuong2 = req.params.soLuong2;
  ThietBi.getByNhaCungCapAndTrangThaiAndSoLuong(maNCC, status, soLuong1, soLuong2, function(data) {
    res.send({ result: data });
  });
};

//-----------------------------------------------TÌM THEO SỐ LƯỢNG - TRẠNG THÁI - THỜI GIAN-----------------------------------------------------//
exports.getBySoLuong_TrangThai_Date = function(req, res) {
  const dateStart = req.params.dateStart;
  const dateEnd = req.params.dateEnd;
  const status = req.params.trangThai;
  const soLuong1 = req.params.soLuong1;
  const soLuong2 = req.params.soLuong2;
  ThietBi.getBysSoLuongAndTrangThaiAndThoiGian(soLuong1, soLuong2, status, dateStart, dateEnd, function(data) {
    res.send({ result: data });
  });
};

//-----------------------------------------------TÌM THEO NHÀ CUNG CẤP - TRẠNG THÁI - SỐ LƯỢNG - KHOẢN THỜI GIAN-----------------------------------------------------//
exports.getByNhaCungCap_TrangThai_SoLuong_Date = function(req, res) {
  const maNCC = req.params.maNCC;
  const status = req.params.trangThai;
  const soLuong1 = req.params.soLuong1;
  const soLuong2 = req.params.soLuong2;
  const dateStart = req.params.dateStart;
  const dateEnd = req.params.dateEnd;
  ThietBi.getByNhaCungCapAndTrangThaiAndSoLuongAndDate(maNCC, status, soLuong1, soLuong2, dateStart, dateEnd, function(data) {
    res.send({ result: data });
  });
};
exports.getBysoLuongHC = function(req, res){
  const soLuongHienCon = parseInt(req.params.soLuong);// Lấy số lượng hiện còn tối đa của thiết bị từ URL parameter  
  if (isNaN(soLuongHienCon)) {
    return res.status(400).send({message: "Số lượng hiện còn không hợp lệ"});
  }
  ThietBi.getBysoLuong(soLuongHienCon, function(err, data) {
    if (err) {
      console.error(err);
      return res.status(500).send({message: "Đã xảy ra lỗi khi truy vấn cơ sở dữ liệu"});
    }
    if (!data || data.length === 0) {
      return res.send({message: "Không có thiết bị nào thỏa mãn điều kiện"});
    }
    return res.send({result: data});
  });
};


  