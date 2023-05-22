const connection = require('../common/connect');

class PhieuXuatData {
  static addData(maPX, ngayXuat, nhanVienXuat, nhanVienNhan) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO PhieuXuat (maPX, ngayXuat, nhanVienXuat, nhanVienNhan) VALUES (?, ?, ?, ?)';
      connection.query(query, [maPX, ngayXuat, nhanVienXuat, nhanVienNhan], (err, result) => {
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

module.exports = PhieuXuatData;
