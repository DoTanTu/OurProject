const ChiTietThietBiXuat = require('../models/chitietthietbixuat.model');

class ChiTietThietBiXuatController {
  static addData(req, res) {
    const { maPX, chiTietThietBi } = req.body;

    // -------------------------------------------------------INSERT DỮ LIỆU--------------------------------------------------//
    const promises = chiTietThietBi.map((thietBi) =>
      ChiTietThietBiXuat.addData(maPX, thietBi.maThietBi, thietBi.soLuong, thietBi.trangThai, thietBi.ghiChu)
    );

    Promise.all(promises)
      .then(() => {
        console.log('Data added successfully!');
        res.status(200).json({ message: 'Data added successfully' });
      })
      .catch((err) => {
        console.error('Error adding data:', err);
        res.status(500).json({ error: 'Error adding data' });
      });
  }
}

module.exports = ChiTietThietBiXuatController;
