const db = require('../common/connect')
const ThietBi = function(thietBi){
    this.maThietBi = thietBi.maTaiKhoan;
    this.tenThietBi = thietBi.tenTaiKhoan;
    this.tenNSX = thietBi.tenNSX;
    this.loaiThietBi = thietBi.loaiThietBi;
    this.hanSD = thietBi.hanSD;
    this.trangThai = thietBi.trangThai;
    this.soLuong = thietBi.soLuong;
    this.donVi = thietBi.donVi;
    this.maNCC = thietBi.maNCC;
    this.tenNCC = thietBi.tenNCC;
}

//Lấy thông tin tất cả thiết bị
ThietBi.getAll = function(result){
    db.query("SELECT ThietBi.maThietBi, ThietBi.tenThietBi, ThietBi.tenNSX, ThietBi.loaiThietBi, ThietBi.hanSD, ThietBi.trangThai, ThietBi.soLuong, ThietBi.donVi,ThietBi.maNCC, NhaCungCap.tenNCC FROM ThietBi JOIN NhaCungCap ON ThietBi.maNCC = NhaCungCap.maNCC", function(err,thietBi){
        if (err)
            result(null);
        else {
            result(thietBi);
        }

    });

};

//Tìm thiết bị theo tên
ThietBi.getByName = function(name, result) {
    db.query("SELECT * FROM thietbi WHERE tenThietBi = ?", [name], function(err, thietBi) {
      if (err) {
        result(null);
      } else {
        result(thietBi);
      }
    });
  };

//Tìm thiết bị theo mã nhà cung cấp
ThietBi.getByMaNCC = function(maNCC, result) {
    db.query("SELECT ThietBi.maThietBi, ThietBi.tenThietBi, ThietBi.tenNSX, ThietBi.loaiThietBi, ThietBi.hanSD, ThietBi.trangThai, ThietBi.soLuong, ThietBi.donVi,ThietBi.maNCC, NhaCungCap.tenNCC FROM ThietBi JOIN NhaCungCap ON ThietBi.maNCC = NhaCungCap.maNCC WHERE ThietBi.maNCC = ?", [maNCC], function(err, thietBi) {
      if (err) {
        result(null);
      } else {
        result(thietBi);
      }
    });
};

//Tìm thiết bị theo trạng thái
ThietBi.getByStatus = function(status, result) {
  db.query("SELECT * FROM ThietBi WHERE ThietBi.trangThai = ?", [status], function(err, thietBi) {
    if (err) {
      result(null);
    } else {
      result(thietBi);
    }
  });
};

//Tìm thiết bị bởi mã nhà cung cấp và trạng thái
ThietBi.getByNCC_status = function(maNCC, status, result) {
  db.query(
    "SELECT tb.maThietBi, tb.tenThietBi, tb.tenNSX, tb.loaiThietBi, tb.hanSD, tb.trangThai, tb.soLuong, tb.donVi, nc.tenNCC " +
    "FROM ThietBi tb " +
    "JOIN NhaCungCap nc ON tb.maNCC = nc.maNCC " +
    "WHERE tb.maNCC = ? AND tb.trangThai = ?;",
    [maNCC,status],
    function(err, thietBi) {
      if (err) {
        result(null);
      } else {
        result(thietBi);
      }
    }
  );
};


module.exports = ThietBi;