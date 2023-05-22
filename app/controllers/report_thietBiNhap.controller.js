
var ThietBiNhap = require('../models/reportthietbinhap.model')

//thống kê số lượng thiết bị được nhập từ ngày ? đến ngày ?
exports.get_SoLuongThietBiNhap_trongktg = function(req, res) {
    const tuNgay = req.params.tuNgay;
    const denNgay = req.params.denNgay;
  
    ThietBiNhap.getSLThietBiimported(tuNgay,denNgay, function(err, data) {
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