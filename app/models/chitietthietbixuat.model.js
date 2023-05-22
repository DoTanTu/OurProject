const connection = require('../common/connect');


//-----------------------------------------------------CHI TIẾT PHIẾU XUẤT---------------------------------------------//
class ChiTietThietBiXuat {
  static addData(maPX, maThietBi, soLuong, trangThai, ghiChu) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO ChiTietThietBiXuat (maPX, maThietBi, soLuong, trangThai, ghiChu) VALUES (?, ?, ?, ?, ?)';
      connection.query(query, [maPX, maThietBi, soLuong, trangThai, ghiChu], (err, result) => {
        if (err) {
          console.error('Error adding data:', err);
          reject(err);
          return;
        }
        console.log('Data added successfully!');
        resolve(result);
      });
    });
  }
}

module.exports = ChiTietThietBiXuat;
