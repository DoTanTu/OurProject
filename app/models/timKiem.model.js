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
    db.query("SELECT ThietBi.maThietBi, ThietBi.tenThietBi, LoaiThietbi.tenLoaiTB, ThietBi.soLuong, ThietBi.donVi, ThietBi.tenNSX, ThietBi.trangThai, ThietBi.hanSD, ThietBi.loaiThietBi, ThietBi.maNCC FROM ThietBi INNER JOIN LoaiThietbi ON ThietBi.loaiThietBi = LoaiThietbi.maLoaiTB WHERE ThietBi.maNCC = ?"
    ,[maNCC], function(err, thietBi) {
      if (err) {
        result(null);
      } else {
        result(thietBi);
      }
    });
};

//---------------------------------------------------------TÌM KIẾM THEO KHOẢN SỐ LƯỢNG-------------------------------------------------//
ThietBi.getBySearchQuantity = function(number1, number2, result) {
  db.query(
    "SELECT tb.maThietBi, tb.tenThietBi, tb.tenNSX, tb.loaiThietBi, tb.hanSD, tb.trangThai, tb.soLuong, tb.donVi, nc.tenNCC " +
    "FROM ThietBi tb " +
    "JOIN NhaCungCap nc ON tb.maNCC = nc.maNCC " +
    "WHERE tb.soLuong >= ? AND tb.soLuong <= ?;",
    [number1, number2],
    function(err, thietBi) {
      if (err) {
        result(null);
      } else {
        result(thietBi);
      }
    }
  );
};


//---------------------------------------------------------TÌM KIẾM THIẾT BỊ THEO TRẠNG THÁI-------------------------------------------------//
ThietBi.getByStatus = function(status, result) {
  db.query("SELECT * FROM ThietBi WHERE ThietBi.trangThai = ?", [status], function(err, thietBi) {
    if (err) {
      result(null);
    } else {
      result(thietBi);
    }
  });
};

//---------------------------------------------------------TÌM KIẾM THIẾT BỊ THEO KHOẢN THỜI GIAN-------------------------------------------------//
ThietBi.getByDate = function( startDate, endDate, result) {
  db.query(
    "SELECT tb.maThietBi, tb.tenThietBi, tb.tenNSX, tb.loaiThietBi, tb.hanSD, tb.trangThai, tb.soLuong, tb.donVi, nc.tenNCC " +
    "FROM ThietBi tb " +
    "JOIN NhaCungCap nc ON tb.maNCC = nc.maNCC " +
    "WHERE tb.hanSD BETWEEN ? AND ?;",
    [startDate, endDate],
    function(err, thietBi) {
      if (err) {
        result(null);
      } else {
        result(thietBi);
      }
    }
  );
};


//-----------------------------------------------TÌM KIẾM THIẾT BỊ THEO NHÀ CUNG CẤP - TRẠNG THÁI-------------------------------------------------//
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

//-----------------------------------------------TÌM KIẾM THIẾT BỊ THEO NHÀ CUNG CẤP - SỐ LƯỢNG-------------------------------------------------//
ThietBi.getByNhaCungCapAndSoLuong = function(maNCC, soLuong1, soLuong2, result) {
  db.query(
    "SELECT tb.maThietBi, tb.tenThietBi, tb.tenNSX, tb.loaiThietBi, tb.hanSD, tb.trangThai, tb.soLuong, tb.donVi, nc.tenNCC " +
    "FROM ThietBi tb " +
    "JOIN NhaCungCap nc ON tb.maNCC = nc.maNCC " +
    "WHERE tb.maNCC = ? AND tb.soLuong >= ? AND tb.soLuong <= ?",
    [maNCC,soLuong1,soLuong2],
    function(err, thietBi) {
      if (err) {
        result(null);
      } else {
        result(thietBi);
      }
    }
  );
};

//------------------------------------------TÌM KIẾM THIẾT BỊ THEO KHOẢN SỐ LƯỢNG - TRẠNG THÁI-------------------------------------------------//
ThietBi.getBySoLuongAndTrangThai = function ( soLuong1, soLuong2, status, result) {
  db.query(
    "SELECT tb.maThietBi, tb.tenThietBi, tb.tenNSX, tb.loaiThietBi, tb.hanSD, tb.trangThai, tb.soLuong, tb.donVi, nc.tenNCC " +
    "FROM ThietBi tb " +
    "JOIN NhaCungCap nc ON tb.maNCC = nc.maNCC " +
    "WHERE tb.soLuong >= ? AND tb.soLuong <= ? AND tb.trangThai = ?;",
    [soLuong1, soLuong2, status],
    function (err, thietBi) {
      if (err) {
        result(null);
      } else {
        result(thietBi);
      }
    }
  );
};

//------------------------------------------TÌM KIẾM THIẾT BỊ THEO KHOẢN SỐ LƯỢNG - THỜI GIAN-------------------------------------------------//
ThietBi.getBySoLuongAndDate = function ( soLuong1, soLuong2, dateStart, dateEnd, result) {
  db.query(
    "SELECT tb.maThietBi, tb.tenThietBi, tb.tenNSX, tb.loaiThietBi, tb.hanSD, tb.trangThai, tb.soLuong, tb.donVi, nc.tenNCC " +
    "FROM ThietBi tb " +
    "JOIN NhaCungCap nc ON tb.maNCC = nc.maNCC " +
    "WHERE tb.soLuong >= ? AND tb.soLuong <= ? AND tb.hanSD >= ? AND tb.hanSD <= ?;",
    [soLuong1, soLuong2, dateStart, dateEnd],
    function (err, thietBi) {
      if (err) {
        result(null);
      } else {
        result(thietBi);
      }
    }
  );
};


//------------------------------------------TÌM KIẾM THIẾT BỊ THEO TRẠNG THÁI - THỜI GIAN-------------------------------------------------//
ThietBi.getByStatusAndDate = function (status, dateStart, dateEnd, result) {
  db.query(
    "SELECT tb.maThietBi, tb.tenThietBi, tb.tenNSX, tb.loaiThietBi, tb.hanSD, tb.trangThai, tb.soLuong, tb.donVi, nc.tenNCC " +
    "FROM ThietBi tb " +
    "JOIN NhaCungCap nc ON tb.maNCC = nc.maNCC " +
    "WHERE tb.trangThai = ? AND tb.hanSD >= ? AND tb.hanSD <= ?;",
    [status, dateStart, dateEnd],
    function (err, thietBi) {
      if (err) {
        result(null);
      } else {
        result(thietBi);
      }
    }
  );
};

//------------------------------------------TÌM KIẾM THIẾT BỊ THEO NHÀ CUNG CẤP - KHOẢN THỜI GIAN-------------------------------------------------//
ThietBi.getByNhaCungCapAnDate = function(maNCC, startDate, endDate, result) {
  db.query(
    "SELECT tb.maThietBi, tb.tenThietBi, tb.tenNSX, tb.loaiThietBi, tb.hanSD, tb.trangThai, tb.soLuong, tb.donVi, nc.tenNCC " +
    "FROM ThietBi tb " +
    "JOIN NhaCungCap nc ON tb.maNCC = nc.maNCC " +
    "WHERE tb.maNCC = ? AND tb.hanSD >= ? AND tb.hanSD <= ?;",
    [maNCC, startDate, endDate],
    function(err, thietBi) {
      if (err) {
        result(null);
      } else {
        result(thietBi);
      }
    }
  );
};

//------------------------------------------TÌM KIẾM THIẾT BỊ THEO NHÀ CUNG CẤP - TRẠNG THÁI - KHOẢN THỜI GIAN-------------------------------------------------//
ThietBi.getByNCC_status_dateRange = function(maNCC, status, startDate, endDate, result) {
  db.query(
    "SELECT tb.maThietBi, tb.tenThietBi, tb.tenNSX, tb.loaiThietBi, tb.hanSD, tb.trangThai, tb.soLuong, tb.donVi, nc.tenNCC " +
    "FROM ThietBi tb " +
    "JOIN NhaCungCap nc ON tb.maNCC = nc.maNCC " +
    "WHERE tb.maNCC = ? AND tb.trangThai = ? AND tb.hanSD >= ? AND tb.hanSD <= ?;",
    [maNCC, status, startDate, endDate],
    function(err, thietBi) {
      if (err) {
        result(null);
      } else {
        result(thietBi);
      }
    }
  );
};

//------------------------------------------TÌM KIẾM THIẾT BỊ THEO NHÀ CUNG CẤP - TRẠNG THÁI - SỐ LƯỢNG-------------------------------------------------//
ThietBi.getByNhaCungCapAndTrangThaiAndSoLuong = function(maNCC, status, soLuong1, soLuong2, result) {
  db.query(
    "SELECT tb.maThietBi, tb.tenThietBi, tb.tenNSX, tb.loaiThietBi, tb.hanSD, tb.trangThai, tb.soLuong, tb.donVi, nc.tenNCC " +
    "FROM ThietBi tb " +
    "JOIN NhaCungCap nc ON tb.maNCC = nc.maNCC " +
    "WHERE tb.maNCC = ? AND tb.trangThai = ? AND tb.soLuong >= ? AND tb.soLuong <= ?;",
    [maNCC, status, soLuong1, soLuong2],
    function(err, thietBi) {
      if (err) {
        result(null);
      } else {
        result(thietBi);
      }
    }
  );
};

//------------------------------------------TÌM KIẾM THIẾT BỊ THEO SỐ LƯƠNG - TRẠNG THÁI - THỜI GIAN-------------------------------------------------//
ThietBi.getBysSoLuongAndTrangThaiAndThoiGian = function(soLuong1, soLuong2, status, dateStart, dateEnd, result) {
  db.query(
    "SELECT tb.maThietBi, tb.tenThietBi, tb.tenNSX, tb.loaiThietBi, tb.hanSD, tb.trangThai, tb.soLuong, tb.donVi, nc.tenNCC " +
    "FROM ThietBi tb " +
    "JOIN NhaCungCap nc ON tb.maNCC = nc.maNCC " +
    "WHERE tb.soLuong >= ? AND tb.soLuong <= ? AND tb.trangThai = ? AND tb.hanSD >= ? AND tb.hanSD <= ?;",
    [soLuong1, soLuong2, status, dateStart, dateEnd],
    function(err, thietBi) {
      if (err) {
        result(null);
      } else {
        result(thietBi);
      }
    }
  );
};

//----------------------------------------TÌM KIẾM THIẾT BỊ THEO NHÀ CUNG CẤP - TRẠNG THÁI - SỐ LƯỢNG - THỜI GIAN-------------------------------------------------//
ThietBi.getByNhaCungCapAndTrangThaiAndSoLuongAndDate = function(maNCC, status, soLuong1, soLuong2, dateStart,dateEnd, result) {
  db.query(
    "SELECT tb.maThietBi, tb.tenThietBi, tb.tenNSX, tb.loaiThietBi, tb.hanSD, tb.trangThai, tb.soLuong, tb.donVi, nc.tenNCC " +
    "FROM ThietBi tb " +
    "JOIN NhaCungCap nc ON tb.maNCC = nc.maNCC " +
    "WHERE tb.maNCC = ? AND tb.trangThai = ? AND tb.soLuong >= ? AND tb.soLuong <= ? AND tb.hanSD >= ? AND tb.hanSD <= ?;",
    [maNCC, status, soLuong1, soLuong2, dateStart, dateEnd],
    function(err, thietBi) {
      if (err) {
        result(null);
      } else {
        result(thietBi);
      }
    }
  );
};

ThietBi.getBysoLuong = function (soLuongHienCon, result) {
  db.query("SELECT * FROM ThietBi WHERE soLuong < ?", [soLuongHienCon], function (err, thietBi) {
    if (err) {
      console.log(err)
      result(err, null);
    } else {
      result(null, thietBi);
    }
  });
};


module.exports = ThietBi;