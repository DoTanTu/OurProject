const db = require('../common/connect');
const ThietBi = function(thietBi){
    this.maThietBi=thietBi.maThietBi;
    this.tenThietBi = thietBi.tenThietBi;
    this.tenNSX = thietBi.tenNSX;
    this.loaiThietBi=thietBi.loaiThietBi;
    this.hanSD=thietBi.hanSD;
    this.trangThai=thietBi.trangThai;
    this.soLuong=thietBi.soLuong;
    this.donVi=thietBi.donVi;
    this.maNCC=thietBi.maNCC;
}
ThietBi.get_all = function(result){
    db.query(" SELECT ThietBi.maThietBi, ThietBi.tenThietBi, LoaiThietbi.tenLoaiTB,ThietBi.soLuong,ThietBi.donVi,ThietBi.tenNSX,ThietBi.trangThai,ThietBi.hanSD,ThietBi.loaiThietBi,ThietBi.maNCC FROM ThietBi INNER JOIN LoaiThietbi ON ThietBi.loaiThietBi = LoaiThietbi.maLoaiTB",function(err,thietBi){
        if(err){
            result(null);
        }else{
            result(thietBi);
        }
    })
}
ThietBi.getById = function(maThietBi,result){
    db.query("select * from ThietBi where maThietBi = ?",maThietBi,function(err,thietBi){
        if(err || thietBi.length==0){
            result(null)
        }
        else{
            result(thietBi)
        }
    })
    
}
ThietBi.create = function(data,result){
    db.query("insert into ThietBi set ?",data,function(err,thietBi){
        if(err){
            result(err)
        }
        else{
            result({maThietBi: thietBi.insertId,...data})
        }
    })
}
ThietBi.remove = function(maThietBi,result){
    db.query("delete from ThietBi where maThietBi = ?",maThietBi,function(err,thietBi){
        if(err){
            result(err)
        }
        else{
            result("xóa thành công")
        }
    })
}
ThietBi.update = function(data,maThietBi,result){
    db.query("update ThietBi set tenThietBi=?,tenNSX=?,loaiThietBi=?,hanSD=?,trangThai=?,soLuong=?,donVi=?,maNCC=? where maThietBi=?",[data.tenThietBi,data.tenNSX,data.loaiThietBi,data.hanSD,data.trangThai,data.soLuong,data.donVi,data.maNCC,maThietBi],function(err,thietBi){
        if(err){
            result(err)
        }
        else{
            result(data)
        }
    })
}
module.exports=ThietBi