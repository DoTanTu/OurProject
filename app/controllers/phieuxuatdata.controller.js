const PhieuXuatData = require('../models/phieuxuatdata.model');

class PhieuXuatController {
  static addData(req, res) {
    const {
      maPX,
      ngayXuat,
      nhanVienXuat,
      nhanVienNhan
    } = req.body;

    //--------------------------------------------------------INSERT DỮ LIỆU---------------------------------------------------//
    PhieuXuatData.addData(maPX, ngayXuat, nhanVienXuat, nhanVienNhan)
      .then(() => {
        res.status(200).json({
          message: 'Data added successfully'
        });
      })
      .catch((err) => {
        console.error('Error adding data:', err);
        res.status(500).json({
          error: 'Error adding data'
        });
      });
  }
}

module.exports = PhieuXuatController;
